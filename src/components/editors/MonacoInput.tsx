"use client";

import React, { useRef, useState, useEffect } from "react";
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
  placeholder = "Paste or type here..."
}) => {
  const [copied, setCopied] = useState(false);
  const [pasted, setPasted] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default true for SSR & mobile-first stability
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
      setPasted(true);
      setTimeout(() => setPasted(false), 2000);
    } catch (err) {
      console.error("Failed to paste text: ", err);
    }
  };

  const handleClear = () => {
    onChange("");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        onChange(text);
      }
    };
    reader.readAsText(file);
    if (event.target) {
      event.target.value = ""; // Reset file input
    }
  };

  return (
    <div className="flex flex-col h-full rounded-lg border border-border-custom bg-sidebar overflow-hidden shadow-lg">
      {/* Header Actions */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-custom bg-background/50">
        <span className="text-sm font-semibold tracking-wide text-zinc-300">{title}</span>

        <div className="flex items-center gap-1.5">
          {/* File Upload */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".json,.txt,.xml,.yaml,.yml,.sql,.csv,.js,.ts"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
            title="Upload File"
          >
            <Upload size={15} />
          </button>

          {/* Paste */}
          <button
            onClick={handlePaste}
            className={`p-1.5 rounded flex items-center gap-1 text-xs transition-colors cursor-pointer ${pasted ? "text-emerald-400 bg-emerald-950/20" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            title="Paste from Clipboard"
          >
            {pasted ? <Check size={15} /> : <Clipboard size={15} />}
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            disabled={!value}
            className={`p-1.5 rounded flex items-center gap-1 text-xs transition-colors cursor-pointer disabled:opacity-40 disabled:hover:bg-transparent ${copied ? "text-emerald-400 bg-emerald-950/20" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            title="Copy Code"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>

          {/* Clear */}
          <button
            onClick={handleClear}
            disabled={!value}
            className="p-1.5 rounded text-zinc-400 hover:bg-zinc-800 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-40 disabled:hover:bg-transparent"
            title="Clear Editor"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="flex-1 min-h-[450px] relative bg-sidebar">
        {!mounted || isMobile ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full p-4 bg-sidebar text-zinc-200 font-mono border-none outline-none resize-none focus:ring-0 focus:outline-none"
            style={{ minHeight: "450px", fontSize: "16px" }}
          />
        ) : (
          <Editor
            height="100%"
            language={language}
            theme="custom-dark"
            beforeMount={(monaco) => {
              monaco.editor.defineTheme("custom-dark", {
                base: "vs-dark",
                inherit: true,
                rules: [],
                colors: {
                  "editor.background": "#161B22",
                },
              });
            }}
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
              fontSize: 16,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
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
