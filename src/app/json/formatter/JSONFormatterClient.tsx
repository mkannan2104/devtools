"use client";

import React, { useState, useEffect } from "react";
import MonacoInput from "@/components/editors/MonacoInput";
import MonacoOutput from "@/components/editors/MonacoOutput";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolGuide from "@/components/tools/ToolGuide";
import ToolSchema from "@/components/tools/ToolSchema";
import ToolExamples, { ToolExample } from "@/components/tools/ToolExamples";
import ToolFAQ, { FAQItem } from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";
import { Sparkles, AlignLeft, Minimize } from "lucide-react";

const EXAMPLES: ToolExample[] = [
  {
    title: "Simple JSON",
    description: "A standard flat JSON object with simple string, number, and boolean fields.",
    content: `{"name":"John Doe","age":30,"isDeveloper":true,"skills":["JavaScript","TypeScript","React"]}`
  },
  {
    title: "Nested Object",
    description: "A more complex JSON document containing nested objects and array elements.",
    content: `{"id":"1001","type":"donut","name":"Cake","image":{"url":"images/0001.jpg","width":200,"height":200},"thumbnail":{"url":"images/thumbnails/0001.jpg","width":32,"height":32},"batters":{"batter":[{"id":"1001","type":"Regular"},{"id":"1002","type":"Chocolate"},{"id":"1003","type":"Blueberry"}]}}`
  },
  {
    title: "Minified Payload",
    description: "An unformatted single-line JSON string representing server response metadata.",
    content: `{"status":"success","code":200,"data":{"users":[{"id":1,"username":"dev1","roles":["admin","user"]},{"id":2,"username":"dev2","roles":["user"]}],"pageInfo":{"total":2,"current":1,"hasMore":false}}}`
  }
];

const FAQS: FAQItem[] = [
  {
    question: "What is a JSON Formatter?",
    answer: "A JSON Formatter is a tool that takes unformatted, minified, or hard-to-read JSON (JavaScript Object Notation) data and cleans it up by adding proper indentation, spacing, and line breaks. It helps developers inspect structure and identify errors easily."
  },
  {
    question: "Does this JSON Formatter send my data to a server?",
    answer: "No. Security and privacy are built-in. All operations run locally inside your browser using client-side JavaScript. Your data never leaves your computer, making it completely secure and privacy-friendly."
  },
  {
    question: "What formatting configurations are supported?",
    answer: "You can format your JSON using 2 spaces, 4 spaces, or tabs. You can also minify your JSON, which compresses the text into a single line by removing all whitespace and line breaks to minimize payload size."
  },
  {
    question: "How do I fix a 'JSON parsing error'?",
    answer: "If you receive an error, check if your JSON has trailing commas, missing quotation marks around keys, or unescaped strings. The editor highlights the line where the syntax error is located to help you debug quickly."
  }
];

export const JSONFormatterClient: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState("2");
  const [error, setError] = useState<string | null>(null);
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

  const formatJSON = (rawInput: string, customIndent = indent) => {
    if (!rawInput.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(rawInput);
      let formatted = "";

      if (customIndent === "minify") {
        formatted = JSON.stringify(parsed);
      } else {
        const space = customIndent === "tab" ? "\t" : parseInt(customIndent, 10);
        formatted = JSON.stringify(parsed, null, space);
      }

      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid JSON syntax. Please check for missing quotes or brackets.");
      setOutput("");
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    formatJSON(value, indent);
  };

  const handleIndentChange = (newIndent: string) => {
    setIndent(newIndent);
    formatJSON(input, newIndent);
  };

  return (
    <div className="space-y-6">
      <ToolHeader
        title="JSON Formatter & Beautifier"
        category="JSON"
        description="Format, clean, and beautify your raw JSON payloads instantly with syntax highlighting. Choose custom indentation spacing or minify your JSON. All formatting runs securely in your browser."
        iconName="Braces"
        externalUrl="https://www.json.org/json-en.html"
        externalUrlLabel="JSON.org Standard Specification"
      />
      <ToolSchema toolId="json-formatter" />
      <ToolGuide toolId="json-formatter" />

      {/* Settings Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border-custom bg-sidebar/40 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium text-zinc-400">Indentation:</label>
          <div className="inline-flex rounded-lg border border-border-custom bg-background p-1">
            <button
              onClick={() => handleIndentChange("2")}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                indent === "2" ? "bg-brand-blue text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              2 Spaces
            </button>
            <button
              onClick={() => handleIndentChange("4")}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                indent === "4" ? "bg-brand-blue text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              4 Spaces
            </button>
            <button
              onClick={() => handleIndentChange("tab")}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                indent === "tab" ? "bg-brand-blue text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              Tabs
            </button>
            <button
              onClick={() => handleIndentChange("minify")}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all flex items-center gap-1 ${
                indent === "minify" ? "bg-brand-blue text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Minimize size={12} />
              Minify
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded border border-red-950 bg-red-950/20 px-3 py-1.5 text-xs font-medium text-red-400">
            Error: {error}
          </div>
        )}
      </div>

      {/* Editor Grid */}
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
              Formatted JSON (Output)
            </button>
          </div>

          <div className="h-[600px]">
            {activeTab === "input" ? (
              <MonacoInput
                value={input}
                onChange={handleInputChange}
                language="json"
                title="Raw JSON Input"
                placeholder="Paste your JSON here..."
              />
            ) : (
              <MonacoOutput
                value={output}
                language="json"
                title="Formatted JSON"
                downloadFilename={indent === "minify" ? "minified.json" : "formatted.json"}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div className="h-[600px]">
            <MonacoInput
              value={input}
              onChange={handleInputChange}
              language="json"
              title="Raw JSON Input"
              placeholder="Paste your JSON here..."
            />
          </div>
          <div className="h-[600px]">
            <MonacoOutput
              value={output}
              language="json"
              title="Formatted JSON"
              downloadFilename={indent === "minify" ? "minified.json" : "formatted.json"}
            />
          </div>
        </div>
      )}

      <ToolExamples examples={EXAMPLES} onSelect={handleInputChange} />
      <ToolFAQ faqs={FAQS} toolName="JSON Formatter" />
      <RelatedTools currentToolId="json-formatter" category="JSON" />
    </div>
  );
};

export default JSONFormatterClient;
