"use client";

import React, { useState, useEffect } from "react";
import MonacoInput from "@/components/editors/MonacoInput";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolExamples, { ToolExample } from "@/components/tools/ToolExamples";
import ToolFAQ, { FAQItem } from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";
import { ChevronDown, ChevronRight, Search, ZoomIn, ZoomOut, Check, HelpCircle } from "lucide-react";

// Interactive Tree Node Component
interface TreeNodeProps {
  name: string | number;
  value: any;
  isLast: boolean;
  depth: number;
  searchQuery: string;
  defaultExpanded?: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  name,
  value,
  isLast,
  depth,
  searchQuery,
  defaultExpanded = true
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  // Detect value types
  const isObject = value !== null && typeof value === "object";
  const isArray = Array.isArray(value);
  const type = typeof value;

  const handleToggle = () => setIsExpanded(!isExpanded);

  // Highlighting matching search queries
  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;
    const parts = text.split(new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <mark key={i} className="bg-brand-blue/35 text-white px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const nameStr = String(name);
  const isNameMatch = searchQuery && nameStr.toLowerCase().includes(searchQuery.toLowerCase());

  if (isObject) {
    const keys = Object.keys(value);
    const isEmpty = keys.length === 0;

    // Filter children matching search query if object is collapsed, or show it anyway
    const bracketOpen = isArray ? "[" : "{";
    const bracketClose = isArray ? "]" : "}";

    return (
      <div className="font-mono text-sm select-none">
        <div
          className="flex items-center gap-1 py-0.5 hover:bg-zinc-800/40 rounded cursor-pointer group"
          onClick={handleToggle}
          style={{ paddingLeft: `${depth * 14}px` }}
        >
          <span className="text-zinc-500 group-hover:text-zinc-300">
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
          <span className="text-zinc-300 font-semibold">
            {highlightText(nameStr, searchQuery)}
          </span>
          <span className="text-zinc-500">:</span>
          <span className="text-zinc-400 font-mono text-xs ml-1">
            {isArray ? `Array(${keys.length})` : `Object`} {bracketOpen}
          </span>
          {!isExpanded && (
            <span className="text-zinc-500 text-sm italic ml-1">
              ... {bracketClose}
            </span>
          )}
        </div>

        {isExpanded && (
          <div>
            {keys.map((key, index) => (
              <TreeNode
                key={key}
                name={isArray ? index : key}
                value={value[key]}
                isLast={index === keys.length - 1}
                depth={depth + 1}
                searchQuery={searchQuery}
                defaultExpanded={defaultExpanded}
              />
            ))}
            <div
              className="text-zinc-500 py-0.5"
              style={{ paddingLeft: `${(depth + 1) * 14}px` }}
            >
              {bracketClose}
              {!isLast && ","}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Primitive value rendering
  let valueStr = String(value);
  let valueColor = "text-emerald-400"; // String

  if (value === null) {
    valueStr = "null";
    valueColor = "text-zinc-500 font-bold";
  } else if (type === "number") {
    valueColor = "text-amber-400";
  } else if (type === "boolean") {
    valueColor = "text-sky-400 font-bold";
    valueStr = value ? "true" : "false";
  } else {
    // String - wrap in double quotes
    valueStr = `"${valueStr}"`;
  }

  const isValueMatch = searchQuery && String(value).toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <div
      className={`font-mono text-sm py-0.5 flex items-start gap-1 hover:bg-zinc-800/20 rounded ${
        isNameMatch || isValueMatch ? "bg-brand-blue/10 border-l-2 border-l-brand-blue pl-0.5" : ""
      }`}
      style={{ paddingLeft: `${(depth + 1) * 14}px` }}
    >
      <span className="text-zinc-400 font-medium">
        {highlightText(nameStr, searchQuery)}
      </span>
      <span className="text-zinc-500">:</span>
      <span className={`${valueColor} break-all whitespace-pre-wrap`}>
        {highlightText(valueStr, searchQuery)}
      </span>
      {!isLast && <span className="text-zinc-500">,</span>}
    </div>
  );
};

const EXAMPLES: ToolExample[] = [
  {
    title: "User Registry",
    description: "An array of detailed user profiles with locations and activity states.",
    content: `[\n  {\n    "id": 1,\n    "name": "Leanne Graham",\n    "username": "Bret",\n    "email": "Sincere@april.biz",\n    "address": {\n      "street": "Kulas Light",\n      "city": "Gwenborough",\n      "zipcode": "92998-3874"\n    },\n    "active": true\n  },\n  {\n    "id": 2,\n    "name": "Ervin Howell",\n    "username": "Antonette",\n    "email": "Shanna@melissa.tv",\n    "address": {\n      "street": "Victor Plains",\n      "city": "Wisokyburgh",\n      "zipcode": "90566-7771"\n    },\n    "active": false\n  }\n]`
  },
  {
    title: "API Status Code",
    description: "Response schema with nested error reports and parameters.",
    content: `{\n  "success": false,\n  "error": {\n    "code": "INVALID_PARAMETERS",\n    "message": "Field 'email' is required on sign up.",\n    "details": [\n      {\n        "field": "email",\n        "issue": "missing"\n      },\n      {\n        "field": "password",\n        "issue": "too_short",\n        "minLength": 8\n      }\n    ]\n  }\n}`
  }
];

const FAQS: FAQItem[] = [
  {
    question: "What is an Interactive JSON Viewer?",
    answer: "An Interactive JSON Viewer parses raw JSON and displays it as a collapsible, nested tree structure. This makes it far easier to read and inspect huge nested payloads like API responses and configurations compared to viewing raw lines of code."
  },
  {
    question: "How do I filter keys or values in the tree?",
    answer: "Simply type your keyword in the search bar above the tree viewer. The tool will highlight matching keys or values and outline the nodes containing the query."
  },
  {
    question: "Does this viewer support folding?",
    answer: "Yes. You can click on the arrow icons next to any object or array node in the tree to collapse or expand it. You can also click the global Expand/Collapse All buttons to reset the tree state."
  }
];

export const JSONViewerClient: React.FC = () => {
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [expandTrigger, setExpandTrigger] = useState(true);
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

  const handleInputChange = (value: string) => {
    setInput(value);
    if (!value.trim()) {
      setParsedData(null);
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(value);
      setParsedData(parsed);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Failed to parse JSON. Please check syntax.");
      setParsedData(null);
    }
  };

  return (
    <div className="space-y-6">
      <ToolHeader
        title="Interactive JSON Viewer"
        category="JSON"
        description="Inspect and explore complex JSON objects using a dynamic, collapsible tree view. Search and filter fields in real-time, fold keys, and inspect arrays. Runs fully inside your browser."
        iconName="Eye"
        externalUrl="https://www.json.org/json-en.html"
        externalUrlLabel="JSON.org Standard Specification"
      />

      {/* Editor & Tree Grid */}
      {mounted && isMobile ? (
        <div className="space-y-4">
          <div className="flex rounded-lg border border-border-custom bg-sidebar overflow-hidden shrink-0">
            <button
              onClick={() => setActiveTab("input")}
              className={`flex-1 py-2.5 text-center text-xs font-semibold border-r border-border-custom/50 transition-all ${
                activeTab === "input" ? "bg-background/80 text-white font-bold" : "text-zinc-400 hover:bg-zinc-800/30"
              }`}
            >
              JSON Source
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`flex-1 py-2.5 text-center text-xs font-semibold transition-all ${
                activeTab === "output" ? "bg-background/80 text-white font-bold" : "text-zinc-400 hover:bg-zinc-800/30"
              }`}
            >
              Tree Inspector (Viewer)
            </button>
          </div>

          <div className="h-[650px]">
            {activeTab === "input" ? (
              <MonacoInput
                value={input}
                onChange={handleInputChange}
                language="json"
                title="JSON Source"
                placeholder="Paste your JSON string here..."
              />
            ) : (
              <div className="flex flex-col h-full rounded-lg border border-border-custom bg-sidebar overflow-hidden shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 border-b border-border-custom bg-background/50">
                  <span className="text-sm font-semibold text-zinc-300">Tree Inspector</span>
                  {parsedData && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExpandTrigger(true)}
                        className="px-2 py-1 rounded border border-border-custom bg-background text-zinc-400 hover:text-white text-2xs font-semibold flex items-center gap-1 transition-all"
                        title="Expand All"
                      >
                        <ZoomIn size={12} />
                        Expand All
                      </button>
                      <button
                        onClick={() => setExpandTrigger(false)}
                        className="px-2 py-1 rounded border border-border-custom bg-background text-zinc-400 hover:text-white text-2xs font-semibold flex items-center gap-1 transition-all"
                        title="Collapse All"
                      >
                        <ZoomOut size={12} />
                        Collapse All
                      </button>
                    </div>
                  )}
                </div>

                {parsedData && (
                  <div className="relative border-b border-border-custom px-4 py-2 bg-background/25">
                    <span className="absolute inset-y-0 left-4 flex items-center pl-2.5 text-zinc-500">
                      <Search size={14} />
                    </span>
                    <input
                      type="text"
                      placeholder="Filter keys or values..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded border border-border-custom bg-background py-1.5 pl-8 pr-3 text-sm text-zinc-200 placeholder-zinc-500 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                    />
                  </div>
                )}

                <div className="flex-1 overflow-auto p-4 bg-sidebar">
                  {error && (
                    <div className="rounded border border-red-950 bg-red-950/20 p-4 text-xs font-semibold text-red-400 flex items-start gap-2">
                      <span className="shrink-0 text-red-400 font-bold font-mono">Syntax Error:</span>
                      <span>{error}</span>
                    </div>
                  )}

                  {!parsedData && !error && (
                    <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 space-y-2">
                      <ChevronRight size={28} className="text-zinc-600 animate-pulse" />
                      <p className="text-xs">No active JSON structure loaded.</p>
                      <p className="text-2xs text-zinc-600 max-w-[200px]">Paste valid JSON in the source editor to browse key-value trees.</p>
                    </div>
                  )}

                  {parsedData && !error && (
                    <div className="space-y-1">
                      <TreeNode
                        name="root"
                        value={parsedData}
                        isLast={true}
                        depth={0}
                        searchQuery={searchQuery}
                        key={String(expandTrigger)}
                        defaultExpanded={expandTrigger}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {/* Input Monaco Editor */}
          <div className="h-[650px]">
            <MonacoInput
              value={input}
              onChange={handleInputChange}
              language="json"
              title="JSON Source"
              placeholder="Paste your JSON string here..."
            />
          </div>

          {/* Interactive Tree View Panel */}
          <div className="flex flex-col h-[650px] rounded-lg border border-border-custom bg-sidebar overflow-hidden shadow-lg">
            {/* Tree Header Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 border-b border-border-custom bg-background/50">
              <span className="text-sm font-semibold text-zinc-300">Tree Inspector</span>

              {/* Tree Controls */}
              {parsedData && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandTrigger(true)}
                    className="px-2 py-1 rounded border border-border-custom bg-background text-zinc-400 hover:text-white text-2xs font-semibold flex items-center gap-1 transition-all"
                    title="Expand All"
                  >
                    <ZoomIn size={12} />
                    Expand All
                  </button>
                  <button
                    onClick={() => setExpandTrigger(false)}
                    className="px-2 py-1 rounded border border-border-custom bg-background text-zinc-400 hover:text-white text-2xs font-semibold flex items-center gap-1 transition-all"
                    title="Collapse All"
                  >
                    <ZoomOut size={12} />
                    Collapse All
                  </button>
                </div>
              )}
            </div>

            {/* Search Query inside Inspector */}
            {parsedData && (
              <div className="relative border-b border-border-custom px-4 py-2 bg-background/25">
                <span className="absolute inset-y-0 left-4 flex items-center pl-2.5 text-zinc-500">
                  <Search size={14} />
                </span>
                <input
                  type="text"
                  placeholder="Filter keys or values..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded border border-border-custom bg-background py-1.5 pl-8 pr-3 text-sm text-zinc-200 placeholder-zinc-500 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                />
              </div>
            )}

            {/* Tree Viewer Content Area */}
            <div className="flex-1 overflow-auto p-4 bg-sidebar">
              {error && (
                <div className="rounded border border-red-950 bg-red-950/20 p-4 text-xs font-semibold text-red-400 flex items-start gap-2">
                  <span className="shrink-0 text-red-400 font-bold font-mono">Syntax Error:</span>
                  <span>{error}</span>
                </div>
              )}

              {!parsedData && !error && (
                <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 space-y-2">
                  <ChevronRight size={28} className="text-zinc-600 animate-pulse" />
                  <p className="text-xs">No active JSON structure loaded.</p>
                  <p className="text-2xs text-zinc-600 max-w-[200px]">Paste valid JSON in the source editor to browse key-value trees.</p>
                </div>
              )}

              {parsedData && !error && (
                <div className="space-y-1">
                  <TreeNode
                    name="root"
                    value={parsedData}
                    isLast={true}
                    depth={0}
                    searchQuery={searchQuery}
                    key={String(expandTrigger)} // Reset component tree when expand/collapse all is clicked
                    defaultExpanded={expandTrigger}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ToolExamples examples={EXAMPLES} onSelect={handleInputChange} />
      <ToolFAQ faqs={FAQS} toolName="JSON Viewer" />
      <RelatedTools currentToolId="json-viewer" category="JSON" />
    </div>
  );
};

export default JSONViewerClient;
