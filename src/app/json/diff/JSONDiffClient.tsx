"use client";

import React, { useState, useEffect, useRef } from "react";
import Editor, { DiffEditor } from "@monaco-editor/react";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolExamples, { ToolExample } from "@/components/tools/ToolExamples";
import ToolFAQ, { FAQItem } from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";
import {
  ArrowLeftRight,
  Trash2,
  Copy,
  Check,
  AlertTriangle,
  Loader2,
  GitCompare,
} from "lucide-react";

/* ─── Static data ─────────────────────────────────────────── */

const EXAMPLES: ToolExample[] = [
  {
    title: "Simple Configuration Diff",
    description:
      "Compare two JSON config documents with modified values, added fields, and removed keys.",
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
}`,
  },
  {
    title: "Array Items Diff",
    description:
      "Compare changes inside arrays like reordered lists or updated indexes.",
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
}`,
  },
];

const FAQS: FAQItem[] = [
  {
    question: "What is a JSON Diff tool?",
    answer:
      "A JSON Diff tool compares two JSON documents side-by-side and highlights changes (green = additions, red = deletions) at the line level.",
  },
  {
    question: "How do I use this tool?",
    answer:
      'Paste or type your original JSON in the left panel and the modified JSON in the right panel. Click "Compare" and the diff viewer below will highlight every change.',
  },
  {
    question: "Is this JSON comparison safe?",
    answer:
      "Yes. Like all utilities in Developer Workbench, all comparison runs entirely in your browser. No data is ever sent to a server.",
  },
];

/* ─── Monaco theme helper ─────────────────────────────────── */

const defineTheme = (monaco: Parameters<NonNullable<React.ComponentProps<typeof Editor>["beforeMount"]>>[0]) => {
  monaco.editor.defineTheme("custom-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: { "editor.background": "#161B22" },
  });
};

const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 15,
  automaticLayout: true,
  wordWrap: "on" as const,
  scrollBeyondLastLine: false,
  padding: { top: 8, bottom: 8 },
  tabSize: 2,
  lineNumbers: "on" as const,
  roundedSelection: false,
};

const LOADING_NODE = (
  <div
    style={{ height: "100%" }}
    className="flex items-center justify-center bg-sidebar text-zinc-500 gap-2"
  >
    <Loader2 className="animate-spin text-brand-blue" size={20} />
    <span className="text-sm">Loading Editor…</span>
  </div>
);

/* ─── Helpers ─────────────────────────────────────────────── */

function isValidJson(s: string) {
  if (!s.trim()) return true; // empty is fine
  try {
    JSON.parse(s);
    return true;
  } catch {
    return false;
  }
}

/* ─── Component ───────────────────────────────────────────── */

export const JSONDiffClient: React.FC = () => {
  const [original, setOriginal] = useState(
    JSON.stringify(
      { name: "Developer Workbench", version: "1.0.0", active: true },
      null,
      2
    )
  );
  const [modified, setModified] = useState(
    JSON.stringify(
      {
        name: "Developer Workbench",
        version: "1.1.0",
        active: true,
        source: "offline",
      },
      null,
      2
    )
  );

  // The values fed into the DiffEditor (only updated when user clicks Compare)
  const [diffOriginal, setDiffOriginal] = useState(original);
  const [diffModified, setDiffModified] = useState(modified);
  const [hasCompared, setHasCompared] = useState(false);

  const [copiedLeft, setCopiedLeft] = useState(false);
  const [copiedRight, setCopiedRight] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Actions ── */

  const handleCompare = () => {
    setDiffOriginal(original);
    setDiffModified(modified);
    setHasCompared(true);
  };

  const handleSwap = () => {
    setOriginal(modified);
    setModified(original);
    // Also swap the diff snapshot if it's been compared
    if (hasCompared) {
      setDiffOriginal(modified);
      setDiffModified(original);
    }
  };

  const handleClear = () => {
    setOriginal("");
    setModified("");
    setDiffOriginal("");
    setDiffModified("");
    setHasCompared(false);
  };

  const copy = async (text: string, setCopied: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleSelectExample = (content: string) => {
    const parts = content.split("---MODIFIED---");
    if (parts.length === 2) {
      const orig = parts[0].replace("ORIGINAL:", "").trim();
      const mod = parts[1].trim();
      setOriginal(orig);
      setModified(mod);
      setHasCompared(false);
    }
  };

  const originalInvalid = !isValidJson(original);
  const modifiedInvalid = !isValidJson(modified);

  /* ── Render ── */

  return (
    <div className="space-y-6">
      <ToolHeader
        title="JSON Diff Checker"
        category="JSON"
        description="Paste your original JSON on the left and modified JSON on the right. Click Compare to see every addition, deletion, and change highlighted side-by-side."
        iconName="Columns"
        externalUrl="https://datatracker.ietf.org/doc/html/rfc6902"
        externalUrlLabel="IETF RFC 6902 (JSON Patch Specification)"
      />

      {/* ── Action Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border-custom bg-sidebar/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSwap}
            className="flex items-center gap-1.5 rounded border border-border-custom bg-background px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-all hover:text-white"
            title="Swap panels"
          >
            <ArrowLeftRight size={13} />
            Swap
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 rounded border border-border-custom bg-background px-3 py-1.5 text-xs font-semibold text-zinc-400 transition-all hover:text-red-400"
            title="Clear all"
          >
            <Trash2 size={13} />
            Clear
          </button>
        </div>

        <div className="flex items-center gap-3">
          {originalInvalid && (
            <span className="flex items-center gap-1 rounded border border-amber-950 bg-amber-950/20 px-2 py-1 text-xs text-amber-500">
              <AlertTriangle size={11} /> Left: Invalid JSON
            </span>
          )}
          {modifiedInvalid && (
            <span className="flex items-center gap-1 rounded border border-amber-950 bg-amber-950/20 px-2 py-1 text-xs text-amber-500">
              <AlertTriangle size={11} /> Right: Invalid JSON
            </span>
          )}
          <button
            onClick={handleCompare}
            disabled={originalInvalid || modifiedInvalid}
            className="flex items-center gap-1.5 rounded border border-brand-blue bg-brand-blue/10 px-4 py-1.5 text-xs font-bold text-brand-blue transition-all hover:bg-brand-blue/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <GitCompare size={13} />
            Compare
          </button>
        </div>
      </div>

      {/* ── Input Editors (two side-by-side editable panels) ── */}
      {isMobile ? (
        /* Mobile: stacked editors */
        <div className="space-y-3">
          <EditorPanel
            label="Original JSON (Left)"
            value={original}
            onChange={setOriginal}
            copied={copiedLeft}
            onCopy={() => copy(original, setCopiedLeft)}
            invalid={originalInvalid}
            mounted={mounted}
          />
          <EditorPanel
            label="Modified JSON (Right)"
            value={modified}
            onChange={setModified}
            copied={copiedRight}
            onCopy={() => copy(modified, setCopiedRight)}
            invalid={modifiedInvalid}
            mounted={mounted}
          />
        </div>
      ) : (
        /* Desktop: side-by-side */
        <div className="grid grid-cols-2 gap-4">
          <EditorPanel
            label="Original JSON (Left)"
            value={original}
            onChange={setOriginal}
            copied={copiedLeft}
            onCopy={() => copy(original, setCopiedLeft)}
            invalid={originalInvalid}
            mounted={mounted}
          />
          <EditorPanel
            label="Modified JSON (Right)"
            value={modified}
            onChange={setModified}
            copied={copiedRight}
            onCopy={() => copy(modified, setCopiedRight)}
            invalid={modifiedInvalid}
            mounted={mounted}
          />
        </div>
      )}

      {/* ── Diff Result ── */}
      {!hasCompared ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border-custom bg-sidebar/30 py-16 text-zinc-500">
          <GitCompare size={36} className="text-zinc-600" />
          <p className="text-sm font-medium">
            Edit both panels above, then click{" "}
            <span className="font-bold text-brand-blue">Compare</span> to see the diff.
          </p>
        </div>
      ) : (
        <div
          className="rounded-lg border border-border-custom bg-sidebar overflow-hidden shadow-lg flex flex-col"
          style={{ height: 500 }}
        >
          {/* Diff header */}
          <div className="flex shrink-0 items-center justify-between border-b border-border-custom bg-background/50 px-4 py-2 text-xs font-semibold text-zinc-400 select-none">
            <div className="flex items-center gap-2">
              <GitCompare size={13} className="text-brand-blue" />
              <span className="text-zinc-300">Diff Result</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-emerald-500">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-500/40 border border-emerald-500" />
                Additions
              </span>
              <span className="flex items-center gap-1 text-red-400">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-red-500/30 border border-red-400" />
                Deletions
              </span>
            </div>
          </div>

          {/* Monaco DiffEditor — read-only, just for visualization */}
          {mounted && (
            <div style={{ flex: 1, minHeight: 0 }}>
              <DiffEditor
                height="100%"
                original={diffOriginal}
                modified={diffModified}
                language="json"
                theme="custom-dark"
                beforeMount={defineTheme}
                loading={LOADING_NODE}
                options={{
                  renderSideBySide: !isMobile,
                  readOnly: true,
                  originalEditable: false,
                  minimap: { enabled: false },
                  fontSize: 15,
                  automaticLayout: true,
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                  padding: { top: 8, bottom: 8 },
                  renderOverviewRuler: false,
                }}
              />
            </div>
          )}
        </div>
      )}

      <ToolExamples examples={EXAMPLES} onSelect={handleSelectExample} />
      <ToolFAQ faqs={FAQS} toolName="JSON Diff" />
      <RelatedTools currentToolId="json-diff" category="JSON" />
    </div>
  );
};

/* ─── Reusable editor panel ───────────────────────────────── */

interface EditorPanelProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  copied: boolean;
  onCopy: () => void;
  invalid: boolean;
  mounted: boolean;
}

function EditorPanel({
  label,
  value,
  onChange,
  copied,
  onCopy,
  invalid,
  mounted,
}: EditorPanelProps) {
  return (
    <div
      className="flex flex-col rounded-lg border border-border-custom bg-sidebar overflow-hidden shadow-lg"
      style={{ height: 340 }}
    >
      {/* Panel header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border-custom bg-background/50 px-4 py-2">
        <span
          className={`text-xs font-semibold tracking-wide ${
            invalid ? "text-amber-400" : "text-zinc-300"
          }`}
        >
          {label}
          {invalid && (
            <span className="ml-2 text-amber-500">
              <AlertTriangle size={11} className="inline" /> Invalid JSON
            </span>
          )}
        </span>
        <button
          onClick={onCopy}
          disabled={!value}
          className={`flex items-center gap-1 rounded p-1.5 text-xs transition-colors disabled:opacity-40 ${
            copied
              ? "bg-emerald-950/20 text-emerald-400"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
          }`}
          title="Copy"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
      </div>

      {/* Editor body */}
      <div style={{ flex: 1, minHeight: 0 }}>
        {mounted ? (
          <Editor
            height="100%"
            language="json"
            theme="custom-dark"
            value={value}
            beforeMount={defineTheme}
            onChange={(v) => onChange(v ?? "")}
            loading={LOADING_NODE}
            options={{
              ...EDITOR_OPTIONS,
              readOnly: false,
            }}
          />
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste JSON here…"
            className="h-full w-full resize-none border-none bg-sidebar p-4 font-mono text-sm text-zinc-200 outline-none focus:ring-0"
          />
        )}
      </div>
    </div>
  );
}

export default JSONDiffClient;
