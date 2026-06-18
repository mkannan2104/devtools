"use client";

import React, { useState, useEffect } from "react";
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
  downloadFilename = "output.txt"
}) => {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default true for SSR & mobile-first stability
  const [mounted, setMounted] = useState(false);

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

  const handleDownload = () => {
    if (!value) return;
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full rounded-lg border border-border-custom bg-sidebar overflow-hidden shadow-lg">
      {/* Header Actions */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-custom bg-background/50">
        <span className="text-sm font-semibold tracking-wide text-zinc-300">{title}</span>

        <div className="flex items-center gap-1.5">
          {/* Download */}
          <button
            onClick={handleDownload}
            disabled={!value}
            className="p-1.5 rounded text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer disabled:opacity-40 disabled:hover:bg-transparent"
            title="Download Output File"
          >
            <Download size={15} />
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            disabled={!value}
            className={`p-1.5 rounded flex items-center gap-1 text-xs transition-colors cursor-pointer disabled:opacity-40 disabled:hover:bg-transparent ${copied ? "text-emerald-400 bg-emerald-950/20" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            title="Copy Output"
          >
            {copied ? (
              <>
                <Check size={15} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={15} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="flex-1 min-h-[450px] relative bg-sidebar">
        {!mounted || isMobile ? (
          <textarea
            value={value}
            readOnly
            placeholder="Output will appear here..."
            className="w-full h-full p-4 bg-sidebar text-zinc-350 font-mono border-none outline-none resize-none focus:ring-0 focus:outline-none"
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
              readOnly: true,
              automaticLayout: true,
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
