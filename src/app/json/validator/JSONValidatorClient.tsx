"use client";

import React, { useState, useEffect } from "react";
import MonacoInput from "@/components/editors/MonacoInput";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolGuide from "@/components/tools/ToolGuide";
import ToolSchema from "@/components/tools/ToolSchema";
import ToolExamples, { ToolExample } from "@/components/tools/ToolExamples";
import ToolFAQ, { FAQItem } from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";
import { CheckCircle2, AlertCircle, Info, Database, Layers } from "lucide-react";

const EXAMPLES: ToolExample[] = [
  {
    title: "Valid JSON",
    description: "A syntactically correct JSON payload.",
    content: `{\n  "status": "active",\n  "count": 42,\n  "settings": {\n    "theme": "dark",\n    "notifications": true\n  }\n}`
  },
  {
    title: "Missing Comma",
    description: "An invalid JSON payload with a missing comma between keys.",
    content: `{\n  "name": "Jane Developer"\n  "role": "frontend"\n}`
  },
  {
    title: "Unquoted Key",
    description: "Invalid JSON where the object key is not wrapped in double quotes.",
    content: `{\n  unquotedKey: "this is invalid in standard JSON"\n}`
  },
  {
    title: "Trailing Comma",
    description: "Invalid JSON containing a trailing comma at the end of an object.",
    content: `{\n  "item": "keyboard",\n  "price": 120,\n}`
  }
];

const FAQS: FAQItem[] = [
  {
    question: "What makes JSON invalid?",
    answer: "Common mistakes that invalidate JSON include: using single quotes instead of double quotes for strings/keys, unquoted keys, trailing commas at the end of lists/objects, missing commas between elements, and mismatched curly braces or square brackets."
  },
  {
    question: "How does the validator calculate JSON depth?",
    answer: "Depth is determined by counting the maximum nesting level of objects or arrays. For example, a flat object has a depth of 1, whereas { 'a': { 'b': 2 } } has a depth of 2."
  },
  {
    question: "What is the difference between JSON formatting and JSON validation?",
    answer: "JSON formatting cleans up whitespace and indents code to make it readable. JSON validation strictly checks if the code follows JavaScript Object Notation syntax rules and locates syntax issues."
  }
];

interface ValidationDetails {
  isValid: boolean;
  message?: string;
  line?: number;
  column?: number;
  sizeBytes?: number;
  charCount?: number;
  keyCount?: number;
  depth?: number;
}

export const JSONValidatorClient: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ValidationDetails | null>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"input" | "output">("input");

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const calculateDepth = (obj: any): number => {
    if (obj === null || typeof obj !== "object") return 0;
    let maxDepth = 0;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        maxDepth = Math.max(maxDepth, calculateDepth(obj[key]));
      }
    }
    return 1 + maxDepth;
  };

  const countKeys = (obj: any): number => {
    if (obj === null || typeof obj !== "object") return 0;
    let count = Object.keys(obj).length;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && typeof obj[key] === "object") {
        count += countKeys(obj[key]);
      }
    }
    return count;
  };

  const handleValidate = (value: string) => {
    setInput(value);

    if (!value.trim()) {
      setResult(null);
      return;
    }

    try {
      const parsed = JSON.parse(value);
      const sizeBytes = new Blob([value]).size;
      const charCount = value.length;
      const depth = calculateDepth(parsed);
      const keyCount = countKeys(parsed);

      setResult({
        isValid: true,
        sizeBytes,
        charCount,
        depth,
        keyCount
      });
    } catch (err: any) {
      const errMsg = err.message || "";
      
      // Parse line and column number from browser JSON.parse error if possible
      // Example error: "Unexpected token } in JSON at position 45" or "JSON.parse: expected ',' ... at line 5 column 3"
      let line: number | undefined;
      let column: number | undefined;

      const lineColMatch = errMsg.match(/line (\d+) column (\d+)/i);
      if (lineColMatch) {
        line = parseInt(lineColMatch[1], 10);
        column = parseInt(lineColMatch[2], 10);
      } else {
        const posMatch = errMsg.match(/position (\d+)/i);
        if (posMatch) {
          const pos = parseInt(posMatch[1], 10);
          const linesUpToPos = value.slice(0, pos).split("\n");
          line = linesUpToPos.length;
          column = linesUpToPos[linesUpToPos.length - 1].length + 1;
        }
      }

      setResult({
        isValid: false,
        message: errMsg,
        line,
        column
      });
    }
  };

  return (
    <div className="space-y-6">
      <ToolHeader
        title="JSON Validator & Linter"
        category="JSON"
        description="Verify the syntax of your JSON documents. Find missing keys, commas, or mismatched brackets in real-time, complete with exact line-number error highlights. Privacy-first, local client-side linting."
        iconName="CheckCircle"
        externalUrl="https://datatracker.ietf.org/doc/html/rfc8259"
        externalUrlLabel="IETF RFC 8259 (JSON Data Interchange Format Specification)"
      />
      <ToolSchema toolId="json-validator" />
      <ToolGuide toolId="json-validator" />

      {mounted && isMobile ? (
        <div className="space-y-4">
          <div className="flex rounded-lg border border-border-custom bg-sidebar overflow-hidden shrink-0">
            <button
              onClick={() => setActiveTab("input")}
              className={`flex-1 py-2.5 text-center text-xs font-semibold border-r border-border-custom/50 transition-all ${
                activeTab === "input" ? "bg-background/80 text-white font-bold" : "text-zinc-400 hover:bg-zinc-800/30"
              }`}
            >
              JSON Input
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`flex-1 py-2.5 text-center text-xs font-semibold transition-all ${
                activeTab === "output" ? "bg-background/80 text-white font-bold" : "text-zinc-400 hover:bg-zinc-800/30"
              }`}
            >
              Validation Report
            </button>
          </div>

          <div className="min-h-[600px]">
            {activeTab === "input" ? (
              <div className="h-[600px]">
                <MonacoInput
                  value={input}
                  onChange={handleValidate}
                  language="json"
                  title="JSON Input to Validate"
                  placeholder="Paste your JSON string here..."
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Validation Report</h3>
                
                {!result ? (
                  <div className="rounded-lg border border-border-custom bg-sidebar/20 p-6 flex flex-col items-center justify-center text-center text-zinc-500 space-y-2">
                    <Info size={32} className="text-zinc-600" />
                    <p className="text-sm">Waiting for input...</p>
                    <p className="text-xs">Paste or write JSON to view its validation report.</p>
                  </div>
                ) : result.isValid ? (
                  <div className="space-y-4">
                    {/* Success Card */}
                    <div className="rounded-lg border border-emerald-950 bg-emerald-950/20 p-5 border-l-4 border-l-emerald-500">
                      <div className="flex items-center gap-3 text-emerald-400 font-bold">
                        <CheckCircle2 size={22} />
                        <span>Valid JSON Syntax</span>
                      </div>
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                        Your JSON conforms perfectly to the RFC 8259 specifications.
                      </p>
                    </div>

                    {/* Stats Card */}
                    <div className="rounded-lg border border-border-custom bg-sidebar/50 p-4 space-y-3">
                      <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider border-b border-border-custom pb-2">Payload Metrics</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-2 rounded bg-background/50 border border-border-custom">
                          <span className="block text-xs text-zinc-500">File Size</span>
                          <span className="font-semibold text-zinc-200">{(result.sizeBytes || 0) < 1024 ? `${result.sizeBytes} B` : `${((result.sizeBytes || 0) / 1024).toFixed(2)} KB`}</span>
                        </div>
                        <div className="p-2 rounded bg-background/50 border border-border-custom">
                          <span className="block text-xs text-zinc-500">Characters</span>
                          <span className="font-semibold text-zinc-200">{result.charCount}</span>
                        </div>
                        <div className="p-2 rounded bg-background/50 border border-border-custom flex items-center gap-2">
                          <Database size={14} className="text-zinc-500" />
                          <div>
                            <span className="block text-xs text-zinc-500">Total Keys</span>
                            <span className="font-semibold text-zinc-200">{result.keyCount}</span>
                          </div>
                        </div>
                        <div className="p-2 rounded bg-background/50 border border-border-custom flex items-center gap-2">
                          <Layers size={14} className="text-zinc-500" />
                          <div>
                            <span className="block text-xs text-zinc-500">Nesting Depth</span>
                            <span className="font-semibold text-zinc-200">{result.depth}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Error Card */}
                    <div className="rounded-lg border border-red-950 bg-red-950/20 p-5 border-l-4 border-l-red-500 space-y-3">
                      <div className="flex items-center gap-3 text-red-400 font-bold">
                        <AlertCircle size={22} className="shrink-0" />
                        <span>Invalid JSON Syntax</span>
                      </div>
                      <div className="text-xs text-red-300 leading-relaxed font-mono bg-red-950/40 p-2.5 rounded border border-red-950">
                        {result.message}
                      </div>
                      {result.line && result.column && (
                        <div className="flex gap-4 text-xs font-semibold text-zinc-400">
                          <div>
                            Line: <span className="text-red-400 font-mono">{result.line}</span>
                          </div>
                          <div>
                            Column: <span className="text-red-400 font-mono">{result.column}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Troubleshooting Tips */}
                    <div className="rounded-lg border border-border-custom bg-sidebar/50 p-4">
                      <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Debugging Tips</h4>
                      <ul className="text-xs text-zinc-400 space-y-2 list-disc list-inside">
                        <li>Check if double quotes are used instead of single quotes.</li>
                        <li>Ensure no trailing commas are present at the end of objects/lists.</li>
                        <li>Ensure all object keys are wrapped in double quotes.</li>
                        <li>Check for matching braces <code className="text-zinc-200 font-mono">{`{}`}</code> or brackets <code className="text-zinc-200 font-mono">{`[]`}</code>.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {/* Editor (Span 2) */}
          <div className="col-span-2 h-[600px]">
            <MonacoInput
              value={input}
              onChange={handleValidate}
              language="json"
              title="JSON Input to Validate"
              placeholder="Paste your JSON string here..."
            />
          </div>

          {/* Validation Results Sidebar */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Validation Report</h3>
            
            {!result ? (
              <div className="flex-1 rounded-lg border border-border-custom bg-sidebar/20 p-6 flex flex-col items-center justify-center text-center text-zinc-500 space-y-2">
                <Info size={32} className="text-zinc-600" />
                <p className="text-sm">Waiting for input...</p>
                <p className="text-xs">Paste or write JSON to view its validation report.</p>
              </div>
            ) : result.isValid ? (
              <div className="flex-1 space-y-4">
                {/* Success Card */}
                <div className="rounded-lg border border-emerald-950 bg-emerald-950/20 p-5 border-l-4 border-l-emerald-500">
                  <div className="flex items-center gap-3 text-emerald-400 font-bold">
                    <CheckCircle2 size={22} />
                    <span>Valid JSON Syntax</span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    Your JSON conforms perfectly to the RFC 8259 specifications.
                  </p>
                </div>

                {/* Stats Card */}
                <div className="rounded-lg border border-border-custom bg-sidebar/50 p-4 space-y-3">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider border-b border-border-custom pb-2">Payload Metrics</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-2 rounded bg-background/50 border border-border-custom">
                      <span className="block text-xs text-zinc-500">File Size</span>
                      <span className="font-semibold text-zinc-200">{(result.sizeBytes || 0) < 1024 ? `${result.sizeBytes} B` : `${((result.sizeBytes || 0) / 1024).toFixed(2)} KB`}</span>
                    </div>
                    <div className="p-2 rounded bg-background/50 border border-border-custom">
                      <span className="block text-xs text-zinc-500">Characters</span>
                      <span className="font-semibold text-zinc-200">{result.charCount}</span>
                    </div>
                    <div className="p-2 rounded bg-background/50 border border-border-custom flex items-center gap-2">
                      <Database size={14} className="text-zinc-500" />
                      <div>
                        <span className="block text-xs text-zinc-500">Total Keys</span>
                        <span className="font-semibold text-zinc-200">{result.keyCount}</span>
                      </div>
                    </div>
                    <div className="p-2 rounded bg-background/50 border border-border-custom flex items-center gap-2">
                      <Layers size={14} className="text-zinc-500" />
                      <div>
                        <span className="block text-xs text-zinc-500">Nesting Depth</span>
                        <span className="font-semibold text-zinc-200">{result.depth}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 space-y-4">
                {/* Error Card */}
                <div className="rounded-lg border border-red-950 bg-red-950/20 p-5 border-l-4 border-l-red-500 space-y-3">
                  <div className="flex items-center gap-3 text-red-400 font-bold">
                    <AlertCircle size={22} className="shrink-0" />
                    <span>Invalid JSON Syntax</span>
                  </div>
                  <div className="text-xs text-red-300 leading-relaxed font-mono bg-red-950/40 p-2.5 rounded border border-red-950">
                    {result.message}
                  </div>
                  {result.line && result.column && (
                    <div className="flex gap-4 text-xs font-semibold text-zinc-400">
                      <div>
                        Line: <span className="text-red-400 font-mono">{result.line}</span>
                      </div>
                      <div>
                        Column: <span className="text-red-400 font-mono">{result.column}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Troubleshooting Tips */}
                <div className="rounded-lg border border-border-custom bg-sidebar/50 p-4">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Debugging Tips</h4>
                  <ul className="text-xs text-zinc-400 space-y-2 list-disc list-inside">
                    <li>Check if double quotes are used instead of single quotes.</li>
                    <li>Ensure no trailing commas are present at the end of objects/lists.</li>
                    <li>Ensure all object keys are wrapped in double quotes.</li>
                    <li>Check for matching braces <code className="text-zinc-200 font-mono">{`{}`}</code> or brackets <code className="text-zinc-200 font-mono">{`[]`}</code>.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <ToolExamples examples={EXAMPLES} onSelect={handleValidate} />
      <ToolFAQ faqs={FAQS} toolName="JSON Validator" />
      <RelatedTools currentToolId="json-validator" category="JSON" />
    </div>
  );
};

export default JSONValidatorClient;
