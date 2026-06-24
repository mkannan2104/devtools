"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Copy, Download, Check, Loader2 } from "lucide-react";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface MonacoOutputProps {
  value: string;
  language: string;
  title?: string;
  downloadFilename?: string;
}

export const MonacoOutput: React.FC<MonacoOutputProps> = ({
  value,
  language,
  title = "Output",
  downloadFilename = "output.txt",
}) => {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    isDestroyedRef.current = false;
    return () => {
      isDestroyedRef.current = true;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      observerRef.current?.disconnect();
      observerRef.current = null;
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

      // Wrap to prevent lifecycle crashes
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
              return;
            }
            throw err;
          }
        };
      };

      if (editor.setModel) editor.setModel = makeSafe(editor.setModel.bind(editor));
      if (editor.layout) editor.layout = makeSafe(editor.layout.bind(editor));
      if (editor.updateOptions) editor.updateOptions = makeSafe(editor.updateOptions.bind(editor));
      if (editor.setValue) editor.setValue = makeSafe(editor.setValue.bind(editor));

      const originalDispose = editor.dispose.bind(editor);
      editor.dispose = () => {
        editor._isDisposed = true;
        try {
          if (containerRef.current) containerRef.current.style.display = "none";
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

  const handleDownload = () => {
    if (!value) return;
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /* ── Render ── */

  return (
    <div className="flex flex-col h-full rounded-lg border border-border-custom bg-sidebar overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-custom bg-background/50 shrink-0">
        <span className="text-sm font-semibold tracking-wide text-zinc-300">{title}</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleDownload}
            disabled={!value}
            className="p-1.5 rounded text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-40"
            title="Download"
          >
            <Download size={15} />
          </button>
          <button
            onClick={handleCopy}
            disabled={!value}
            className={`p-1.5 rounded flex items-center gap-1 text-xs transition-colors disabled:opacity-40 ${copied ? "text-emerald-400 bg-emerald-950/20" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
            title="Copy Output"
          >
            {copied ? (
              <><Check size={15} /><span>Copied!</span></>
            ) : (
              <><Copy size={15} /><span>Copy</span></>
            )}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div ref={containerRef} className="flex-1 min-h-[450px] relative bg-sidebar">
        {!mounted || isMobile ? (
          <textarea
            value={value}
            readOnly
            placeholder="Output will appear here..."
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
              readOnly: true,
              automaticLayout: false,
              tabSize: 2,
              wordWrap: "on",
              padding: { top: 8, bottom: 8 },
              domReadOnly: true,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MonacoOutput;
