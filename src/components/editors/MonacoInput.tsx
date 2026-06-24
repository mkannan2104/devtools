"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Copy, Trash2, Clipboard, Upload, Check, Loader2 } from "lucide-react";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface MonacoInputProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  title?: string;
  placeholder?: string;
}

export const MonacoInput: React.FC<MonacoInputProps> = ({
  value,
  onChange,
  language,
  title = "Input",
  placeholder = "Paste or type here...",
}) => {
  const [copied, setCopied] = useState(false);
  const [pasted, setPasted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const isDestroyedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Global unmount cleanup
  useEffect(() => {
    isDestroyedRef.current = false;
    return () => {
      isDestroyedRef.current = true;

      // Cancel any pending layout RAF we scheduled
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      // Disconnect resize observer before the DOM is removed
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      // @monaco-editor/react will call editor.dispose() on its own.
      // Our patch (installed in onMount) handles model-null + hide before that.
    };
  }, []);

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    if (!containerRef.current || !editorRef.current) return;

    observerRef.current = new ResizeObserver(() => {
      if (isDestroyedRef.current) return;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (isDestroyedRef.current) return;
        try { editorRef.current?.layout(); } catch { /* disposed */ }
      });
    });
    observerRef.current.observe(containerRef.current);
  }, []);

  const handleMount = useCallback(
    (editor: any) => {
      editorRef.current = editor;
      editor._isDisposed = false;

      // Wrap a function to suppress any lifecycle-related errors if editor is disposed
      const makeSafe = (originalFn: any) => {
        return (...args: any[]) => {
          if (editor._isDisposed || (typeof editor.isDisposed === "function" && editor.isDisposed())) {
            return;
          }
          try {
            return originalFn(...args);
          } catch (err: any) {
            const msg = err?.message || "";
            if (
              msg.includes("InstantiationService") ||
              msg.includes("domNode") ||
              msg.includes("disposed")
            ) {
              return; // ignore silent lifecycle errors
            }
            throw err;
          }
        };
      };

      // Monkey-patch functions that React or callbacks may invoke during unmount/transitions
      if (editor.setModel) editor.setModel = makeSafe(editor.setModel.bind(editor));
      if (editor.layout) editor.layout = makeSafe(editor.layout.bind(editor));
      if (editor.updateOptions) editor.updateOptions = makeSafe(editor.updateOptions.bind(editor));
      if (editor.setValue) editor.setValue = makeSafe(editor.setValue.bind(editor));

      const originalDispose = editor.dispose.bind(editor);
      editor.dispose = () => {
        editor._isDisposed = true;
        try {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
          editor.setModel(null);
        } catch { /* already disposed */ }

        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        observerRef.current?.disconnect();
        observerRef.current = null;

        try { originalDispose(); } catch { /* ignore */ }
      };

      setupObserver();
    },
    [setupObserver]
  );

  /* ── Actions ── */

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) { console.error("Failed to copy:", err); }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
      setPasted(true);
      setTimeout(() => setPasted(false), 2000);
    } catch (err) { console.error("Failed to paste:", err); }
  };

  const handleClear = () => onChange("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === "string") onChange(ev.target.result);
    };
    reader.readAsText(file);
    if (e.target) e.target.value = "";
  };

  /* ── Render ── */

  return (
    <div className="flex flex-col h-full rounded-lg border border-border-custom bg-sidebar overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-custom bg-background/50 shrink-0">
        <span className="text-sm font-semibold tracking-wide text-zinc-300">{title}</span>
        <div className="flex items-center gap-1.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".json,.txt,.xml,.yaml,.yml,.sql,.csv,.js,.ts"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            title="Upload File"
          >
            <Upload size={15} />
          </button>
          <button
            onClick={handlePaste}
            className={`p-1.5 rounded flex items-center gap-1 text-xs transition-colors ${pasted ? "text-emerald-400 bg-emerald-950/20" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
            title="Paste"
          >
            {pasted ? <Check size={15} /> : <Clipboard size={15} />}
          </button>
          <button
            onClick={handleCopy}
            disabled={!value}
            className={`p-1.5 rounded flex items-center gap-1 text-xs transition-colors disabled:opacity-40 ${copied ? "text-emerald-400 bg-emerald-950/20" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
            title="Copy"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
          <button
            onClick={handleClear}
            disabled={!value}
            className="p-1.5 rounded text-zinc-400 hover:bg-zinc-800 hover:text-red-400 transition-colors disabled:opacity-40"
            title="Clear"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div ref={containerRef} className="flex-1 min-h-[450px] relative bg-sidebar">
        {!mounted || isMobile ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full p-4 bg-sidebar text-zinc-200 font-mono border-none outline-none resize-none"
            style={{ minHeight: "450px", fontSize: "15px" }}
          />
        ) : (
          <Editor
            height="100%"
            language={language}
            theme="custom-dark"
            beforeMount={(monaco) => {
              // Silence asynchronous unmount/disposal errors
              monaco.onUnexpectedError = (err: any) => {
                const msg = err?.message || (err && String(err)) || "";
                if (
                  msg.includes("InstantiationService") ||
                  msg.includes("domNode") ||
                  msg.includes("disposed")
                ) {
                  return;
                }
                console.error(err);
              };

              monaco.editor.defineTheme("custom-dark", {
                base: "vs-dark",
                inherit: true,
                rules: [],
                colors: { "editor.background": "#161B22" },
              });
            }}
            onMount={handleMount}
            value={value}
            onChange={(val) => onChange(val || "")}
            loading={
              <div className="absolute inset-0 flex items-center justify-center bg-sidebar text-zinc-500 gap-2">
                <Loader2 className="animate-spin text-brand-blue" size={20} />
                <span className="text-sm">Loading Editor...</span>
              </div>
            }
            options={{
              minimap: { enabled: false },
              fontSize: 15,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: false,
              tabSize: 2,
              wordWrap: "on",
              padding: { top: 8, bottom: 8 },
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MonacoInput;
