"use client";

import React, { useState, useEffect, useRef } from "react";
import { DiffEditor } from "@monaco-editor/react";
import MonacoInput from "@/components/editors/MonacoInput";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolExamples, { ToolExample } from "@/components/tools/ToolExamples";
import ToolFAQ, { FAQItem } from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";
import { ArrowLeftRight, Trash2, Copy, Check, Info, AlertTriangle, Loader2 } from "lucide-react";

const EXAMPLES: ToolExample[] = [
  {
    title: "Simple Configuration Diff",
    description: "Compare two JSON config documents with modified values, added fields, and removed keys.",
    content: `ORIGINAL:
{
  "appName": "Developer Workbench",
  "version": "1.0.0",
  "features": {
    "darkMode": true,
    "offlineMode": false
  },
  "maxUsers": 100
}
---MODIFIED---
{
  "appName": "Developer Workbench Pro",
  "version": "1.1.0",
  "features": {
    "darkMode": true,
    "offlineMode": true,
    "premiumSupport": true
  }
}`
  },
  {
    title: "Array Items Diff",
    description: "Compare changes inside arrays like reordered lists or updated indexes.",
    content: `ORIGINAL:
{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" },
    { "id": 3, "name": "Charlie" }
  ]
}
---MODIFIED---
{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 3, "name": "Charlie" },
    { "id": 4, "name": "David" }
  ]
}`
  }
];

const FAQS: FAQItem[] = [
  {
    question: "What is a JSON Diff tool?",
    answer: "A JSON Diff tool compares two JSON documents (Original and Modified) side-by-side and highlights any changes (insertions in green, deletions in red, and updates) at the character level."
  },
  {
    question: "Can I edit the code directly inside the diff view?",
    answer: "Yes, you can edit the text directly in both panels of the Monaco Diff Editor. The diff updates in real-time as you type, copy, or paste."
  },
  {
    question: "Is this JSON comparison safe?",
    answer: "Yes. Like all other utilities in Developer Workbench, all comparison operations are performed entirely in your browser. No data is sent to a server."
  }
];

export const JSONDiffClient: React.FC = () => {
  const [original, setOriginal] = useState(
    JSON.stringify({ name: "Developer Workbench", version: "1.0.0", active: true }, null, 2)
  );
  const [modified, setModified] = useState(
    JSON.stringify({ name: "Developer Workbench", version: "1.1.0", active: true, source: "offline" }, null, 2)
  );
  const [copiedModified, setCopiedModified] = useState(false);
  const [originalError, setOriginalError] = useState<boolean>(false);
  const [modifiedError, setModifiedError] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"original" | "modified" | "diff">("original");
  const containerRef = useRef<HTMLDivElement>(null);
  const [diffEditorInstance, setDiffEditorInstance] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const isDiffRendered = (isMobile && activeTab === "diff") || !isMobile;
    if (!isDiffRendered) {
      setDiffEditorInstance(null);
    }
  }, [isMobile, activeTab]);

  // Clean up diff editor model to avoid lifecycle disposal crashes
  useEffect(() => {
    const editor = diffEditorInstance;
    return () => {
      if (editor) {
        try {
          editor.setModel(null);
        } catch (e) {
          // Ignore layout or model errors
        }
      }
    };
  }, [diffEditorInstance]);

  useEffect(() => {
    if (!mounted || !containerRef.current || !diffEditorInstance) return;

    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        if (diffEditorInstance) {
          try {
            diffEditorInstance.layout();
          } catch (e) {
            // Ignore layout errors on disposed editors
          }
        }
      });
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [mounted, diffEditorInstance]);

  const handleOriginalChange = (value: string | undefined) => {
    const val = value || "";
    setOriginal(val);
    try {
      if (val.trim()) JSON.parse(val);
      setOriginalError(false);
    } catch {
      setOriginalError(true);
    }
  };

  const handleModifiedChange = (value: string | undefined) => {
    const val = value || "";
    setModified(val);
    try {
      if (val.trim()) JSON.parse(val);
      setModifiedError(false);
    } catch {
      setModifiedError(true);
    }
  };

  const handleSwap = () => {
    const temp = original;
    setOriginal(modified);
    setModified(temp);

    const tempErr = originalError;
    setOriginalError(modifiedError);
    setModifiedError(tempErr);
  };

  const handleClear = () => {
    setOriginal("");
    setModified("");
    setOriginalError(false);
    setModifiedError(false);
  };

  const handleCopyModified = async () => {
    try {
      await navigator.clipboard.writeText(modified);
      setCopiedModified(true);
      setTimeout(() => setCopiedModified(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectExample = (content: string) => {
    const parts = content.split("---MODIFIED---");
    if (parts.length === 2) {
      const orig = parts[0].replace("ORIGINAL:", "").trim();
      const mod = parts[1].trim();
      setOriginal(orig);
      setModified(mod);
      setOriginalError(false);
      setModifiedError(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToolHeader
        title="JSON Diff Checker"
        category="JSON"
        description="Compare two JSON objects side-by-side and highlight additions, deletions, and updates instantly. Built with Monaco's native diff editor to provide clean visual diffs."
        iconName="Columns"
        externalUrl="https://datatracker.ietf.org/doc/html/rfc6902"
        externalUrlLabel="IETF RFC 6902 (JSON Patch Specification)"
      />

      {/* Control Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border-custom bg-sidebar/40 p-4">
        <div className="flex items-center gap-2">
          {/* Swap */}
          <button
            onClick={handleSwap}
            className="px-3 py-1.5 rounded border border-border-custom bg-background text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Swap Panels"
          >
            <ArrowLeftRight size={14} />
            Swap
          </button>

          {/* Clear */}
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded border border-border-custom bg-background text-zinc-400 hover:text-red-400 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Clear All"
          >
            <Trash2 size={14} />
            Clear
          </button>
        </div>

        {/* Validation Status Tags */}
        <div className="flex flex-wrap items-center gap-4">
          {originalError && (
            <span className="flex items-center gap-1.5 text-xs text-amber-500 bg-amber-950/20 border border-amber-950 px-2 py-1 rounded">
              <AlertTriangle size={12} />
              Left: Invalid JSON
            </span>
          )}
          {modifiedError && (
            <span className="flex items-center gap-1.5 text-xs text-amber-500 bg-amber-950/20 border border-amber-950 px-2 py-1 rounded">
              <AlertTriangle size={12} />
              Right: Invalid JSON
            </span>
          )}

          {/* Copy Modified */}
          <button
            onClick={handleCopyModified}
            disabled={!modified}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-all border ${copiedModified
                ? "bg-emerald-950/20 border-emerald-950 text-emerald-400"
                : "bg-background border-border-custom text-zinc-300 hover:text-white"
              } disabled:opacity-40`}
          >
            {copiedModified ? <Check size={14} /> : <Copy size={14} />}
            Copy Right Side
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div ref={containerRef} className="rounded-lg border border-border-custom bg-sidebar overflow-hidden shadow-lg flex flex-col" style={{ height: 650 }}>
        {!mounted ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-sidebar text-zinc-500 gap-2">
            <Loader2 className="animate-spin text-brand-blue" size={20} />
            <span className="text-sm">Loading Comparison view...</span>
          </div>
        ) : (
          <>
            {/* Responsive Tab Bar (Mobile Only) */}
            {isMobile ? (
              <div className="flex border-b border-border-custom bg-background/50 text-xs font-semibold text-zinc-400 select-none shrink-0">
                <button
                  onClick={() => setActiveTab("original")}
                  className={`flex-1 py-2.5 text-center border-r border-border-custom/50 transition-all ${
                    activeTab === "original" ? "bg-sidebar text-white font-bold" : "hover:bg-zinc-800/30"
                  }`}
                >
                  Original
                </button>
                <button
                  onClick={() => setActiveTab("modified")}
                  className={`flex-1 py-2.5 text-center border-r border-border-custom/50 transition-all ${
                    activeTab === "modified" ? "bg-sidebar text-white font-bold" : "hover:bg-zinc-800/30"
                  }`}
                >
                  Modified
                </button>
                <button
                  onClick={() => setActiveTab("diff")}
                  className={`flex-1 py-2.5 text-center transition-all ${
                    activeTab === "diff" ? "bg-sidebar text-white font-bold" : "hover:bg-zinc-800/30"
                  }`}
                >
                  Diff Viewer
                </button>
              </div>
            ) : (
              /* Editor Labels (Desktop Only) */
              <div className="flex justify-between border-b border-border-custom bg-background/50 px-4 py-2 text-xs font-semibold text-zinc-400 select-none shrink-0">
                <div className="w-1/2 border-r border-border-custom/50 pr-2">Original JSON (Left)</div>
                <div className="w-1/2 pl-2">Modified JSON (Right)</div>
              </div>
            )}

            {/* Content Area — explicitly fills remaining height via flex-1 with overflow hidden */}
            <div className="flex-1 overflow-hidden" style={{ minHeight: 0 }}>
              {isMobile ? (
                <div style={{ height: "100%" }}>
                  {activeTab === "original" && (
                    <div style={{ height: "100%" }}>
                      <MonacoInput
                        value={original}
                        onChange={handleOriginalChange}
                        language="json"
                        title="Original JSON"
                        placeholder="Paste original JSON here..."
                      />
                    </div>
                  )}
                  {activeTab === "modified" && (
                    <div style={{ height: "100%" }}>
                      <MonacoInput
                        value={modified}
                        onChange={handleModifiedChange}
                        language="json"
                        title="Modified JSON"
                        placeholder="Paste modified JSON here..."
                      />
                    </div>
                  )}
                  {activeTab === "diff" && (
                    <div style={{ height: "100%" }}>
                      <DiffEditor
                        height="100%"
                        original={original}
                        modified={modified}
                        language="json"
                        theme="custom-dark"
                        beforeMount={(monaco) => {
                          monaco.editor.defineTheme("custom-dark", {
                            base: "vs-dark",
                            inherit: true,
                            rules: [],
                            colors: { "editor.background": "#161B22" },
                          });
                        }}
                        loading={
                          <div style={{ height: "100%" }} className="flex items-center justify-center bg-sidebar text-zinc-500 gap-2">
                            <Loader2 className="animate-spin text-brand-blue" size={20} />
                            <span className="text-sm">Loading Comparison view...</span>
                          </div>
                        }
                        onMount={(editor) => {
                          setDiffEditorInstance(editor);
                          editor.getOriginalEditor().onDidChangeModelContent(() => {
                            handleOriginalChange(editor.getOriginalEditor().getValue());
                          });
                          editor.getModifiedEditor().onDidChangeModelContent(() => {
                            handleModifiedChange(editor.getModifiedEditor().getValue());
                          });
                        }}
                        options={{
                          renderSideBySide: false,
                          originalEditable: true,
                          minimap: { enabled: false },
                          fontSize: 15,
                          automaticLayout: true,
                          wordWrap: "on",
                          scrollBeyondLastLine: false,
                          padding: { top: 8, bottom: 8 },
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                /* Desktop: explicit 100% height container for DiffEditor */
                <div style={{ height: "100%" }}>
                  <DiffEditor
                    height="100%"
                    original={original}
                    modified={modified}
                    language="json"
                    theme="custom-dark"
                    beforeMount={(monaco) => {
                      monaco.editor.defineTheme("custom-dark", {
                        base: "vs-dark",
                        inherit: true,
                        rules: [],
                        colors: { "editor.background": "#161B22" },
                      });
                    }}
                    loading={
                      <div style={{ height: "100%" }} className="flex items-center justify-center bg-sidebar text-zinc-500 gap-2">
                        <Loader2 className="animate-spin text-brand-blue" size={20} />
                        <span className="text-sm">Loading Comparison view...</span>
                      </div>
                    }
                    onMount={(editor) => {
                      setDiffEditorInstance(editor);
                      editor.getOriginalEditor().onDidChangeModelContent(() => {
                        handleOriginalChange(editor.getOriginalEditor().getValue());
                      });
                      editor.getModifiedEditor().onDidChangeModelContent(() => {
                        handleModifiedChange(editor.getModifiedEditor().getValue());
                      });
                    }}
                    options={{
                      renderSideBySide: true,
                      originalEditable: true,
                      minimap: { enabled: false },
                      fontSize: 15,
                      automaticLayout: true,
                      wordWrap: "on",
                      scrollBeyondLastLine: false,
                      padding: { top: 8, bottom: 8 },
                    }}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <ToolExamples examples={EXAMPLES} onSelect={handleSelectExample} />
      <ToolFAQ faqs={FAQS} toolName="JSON Diff" />
      <RelatedTools currentToolId="json-diff" category="JSON" />
    </div>
  );
};

export default JSONDiffClient;
