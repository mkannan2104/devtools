"use client";

import React, { useState, useEffect } from "react";
import MonacoInput from "@/components/editors/MonacoInput";
import MonacoOutput from "@/components/editors/MonacoOutput";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolExamples, { ToolExample } from "@/components/tools/ToolExamples";
import ToolFAQ, { FAQItem } from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";
import { Sparkles, FileText, ArrowRightLeft } from "lucide-react";

const EXAMPLES: ToolExample[] = [
  {
    title: "HTML Tag Escaping",
    description: "Convert HTML tags and characters into safe HTML entities.",
    content: `<div className="flex items-center" id="main-content">
  <h1 class='title'>Welcome & Hello World!</h1>
  <p>Some text with symbols: ©, ®, ™ & "quotes"</p>
</div>`
  },
  {
    title: "JSON String Literal",
    description: "Escape quotes and special characters for insertion into JSON payloads.",
    content: `First Line
Second Line with "double quotes" and 'single quotes'.
Nested backslash: C:\\Program Files\\NodeJS\\node.exe`
  },
  {
    title: "URL Query Parameters",
    description: "Percent-encode query parameters containing special URL characters like spaces, slashes, and ampersands.",
    content: "search=developer tools&category=text-utilities/escape & unescape&user=guest@www.developerworkbench.in"
  }
];

const FAQS: FAQItem[] = [
  {
    question: "What is String Escaping?",
    answer: "String escaping is the process of converting special characters (like quotes, backslashes, HTML brackets, or URL separators) into their equivalent secure text representation (such as \\\", &lt;, or %20). This prevents syntax errors, formatting crashes, or security vulnerabilities (like XSS or injection attacks) when processed by parser engines."
  },
  {
    question: "What formats does this String Escaper support?",
    answer: "Our tool supports multiple common developer formats: JSON escaping, URL encoding/decoding, HTML entity escaping/unescaping, and standard JavaScript/TypeScript string literal formatting."
  },
  {
    question: "Is my text data safe?",
    answer: "Yes, 100%. Like all tools on Developer Workbench, all string escaping and unescaping operations are run locally inside your browser memory. No text is transmitted or stored on any server."
  }
];

type EscapeMode = 
  | "json-escape" 
  | "json-unescape" 
  | "url-encode" 
  | "url-decode" 
  | "html-escape" 
  | "html-unescape"
  | "js-escape"
  | "js-unescape";

export const StringEscaperClient: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<EscapeMode>("json-escape");
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

  const escapeJson = (str: string): string => {
    return JSON.stringify(str).slice(1, -1);
  };

  const unescapeJson = (str: string): string => {
    try {
      // JSON.parse needs valid double quotes around the string to be parsed correctly
      return JSON.parse('"' + str.replace(/\\"/g, '"').replace(/"/g, '\\"') + '"');
    } catch {
      // Fallback
      return str.replace(/\\(.)/g, "$1");
    }
  };

  const escapeHtml = (str: string): string => {
    return str.replace(/[&<>"']/g, (match) => {
      switch (match) {
        case "&": return "&amp;";
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "\"": return "&quot;";
        case "'": return "&#39;";
        default: return match;
      }
    });
  };

  const unescapeHtml = (str: string): string => {
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (match) => {
      switch (match) {
        case "&amp;": return "&";
        case "&lt;": return "<";
        case "&gt;": return ">";
        case "&quot;": return "\"";
        case "&#39;": return "'";
        default: return match;
      }
    });
  };

  const escapeUrl = (str: string): string => {
    return encodeURIComponent(str);
  };

  const unescapeUrl = (str: string): string => {
    try {
      return decodeURIComponent(str);
    } catch {
      return str;
    }
  };

  const escapeJs = (str: string): string => {
    return str.replace(/['"\\\n\r\t]/g, (match) => {
      switch (match) {
        case "'": return "\\'";
        case "\"": return "\\\"";
        case "\\": return "\\\\";
        case "\n": return "\\n";
        case "\r": return "\\r";
        case "\t": return "\\t";
        default: return match;
      }
    });
  };

  const unescapeJs = (str: string): string => {
    return str.replace(/\\(['"\\nrt])/g, (match, p1) => {
      switch (p1) {
        case "'": return "'";
        case "\"": return "\"";
        case "\\": return "\\";
        case "n": return "\n";
        case "r": return "\r";
        case "t": return "\t";
        default: return match;
      }
    });
  };

  const processString = (rawInput: string, currentMode = mode) => {
    if (!rawInput) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      let result = "";
      switch (currentMode) {
        case "json-escape":
          result = escapeJson(rawInput);
          break;
        case "json-unescape":
          result = unescapeJson(rawInput);
          break;
        case "html-escape":
          result = escapeHtml(rawInput);
          break;
        case "html-unescape":
          result = unescapeHtml(rawInput);
          break;
        case "url-encode":
          result = escapeUrl(rawInput);
          break;
        case "url-decode":
          result = unescapeUrl(rawInput);
          break;
        case "js-escape":
          result = escapeJs(rawInput);
          break;
        case "js-unescape":
          result = unescapeJs(rawInput);
          break;
      }
      setOutput(result);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Failed to process text. Check your escape sequences.");
      setOutput("");
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    processString(value, mode);
  };

  const handleModeChange = (newMode: EscapeMode) => {
    setMode(newMode);
    processString(input, newMode);
  };

  const handleSwap = () => {
    const temp = input;
    setInput(output);
    setOutput(temp);
    // Find reverse mode if matching
    const reverseMap: Record<EscapeMode, EscapeMode> = {
      "json-escape": "json-unescape",
      "json-unescape": "json-escape",
      "html-escape": "html-unescape",
      "html-unescape": "html-escape",
      "url-encode": "url-decode",
      "url-decode": "url-encode",
      "js-escape": "js-unescape",
      "js-unescape": "js-escape"
    };
    const nextMode = reverseMap[mode];
    setMode(nextMode);
    processString(output, nextMode);
  };

  return (
    <div className="space-y-6">
      <ToolHeader
        title="String Escaper & Unescaper"
        category="Text"
        description="Escape or unescape text strings for JSON, HTML entities, URL encodings, and JS/TS literals securely. Swap and edit inputs instantly."
        iconName="FileText"
        externalUrl="https://en.wikipedia.org/wiki/Escape_character"
        externalUrlLabel="Wikipedia Escape Character Reference"
      />

      {/* Settings Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border-custom bg-sidebar/40 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium text-zinc-400">Operation:</label>
          <select
            value={mode}
            onChange={(e) => handleModeChange(e.target.value as EscapeMode)}
            className="rounded-lg border border-border-custom bg-background px-3 py-1.5 text-xs font-semibold text-zinc-200 focus:outline-none focus:border-brand-blue cursor-pointer"
          >
            <option value="json-escape">JSON Escape</option>
            <option value="json-unescape">JSON Unescape</option>
            <option value="html-escape">HTML Encode (Entities)</option>
            <option value="html-unescape">HTML Decode (Entities)</option>
            <option value="url-encode">URL Encode (Percent)</option>
            <option value="url-decode">URL Decode (Percent)</option>
            <option value="js-escape">JS String Escape</option>
            <option value="js-unescape">JS String Unescape</option>
          </select>

          <button
            onClick={handleSwap}
            disabled={!output}
            className="rounded border border-border-custom bg-background/50 hover:bg-background text-zinc-400 hover:text-white px-2.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:hover:bg-background/50 disabled:hover:text-zinc-400"
            title="Swap input and output values"
          >
            <ArrowRightLeft size={13} />
            Swap
          </button>
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
              Raw Input
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`flex-1 py-2.5 text-center text-xs font-semibold transition-all ${
                activeTab === "output" ? "bg-background/80 text-white font-bold" : "text-zinc-400 hover:bg-zinc-800/30"
              }`}
            >
              Escaped Output
            </button>
          </div>

          <div className="h-[550px]">
            {activeTab === "input" ? (
              <MonacoInput
                value={input}
                onChange={handleInputChange}
                language="text"
                title="Raw Text Input"
                placeholder="Type or paste text to escape/unescape..."
              />
            ) : (
              <MonacoOutput
                value={output}
                language="text"
                title="Processed Output"
                downloadFilename="processed-string.txt"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div className="h-[550px]">
            <MonacoInput
              value={input}
              onChange={handleInputChange}
              language="text"
              title="Raw Text Input"
              placeholder="Type or paste text to escape/unescape..."
            />
          </div>
          <div className="h-[550px]">
            <MonacoOutput
              value={output}
              language="text"
              title="Processed Output"
              downloadFilename="processed-string.txt"
            />
          </div>
        </div>
      )}

      <ToolExamples examples={EXAMPLES} onSelect={handleInputChange} />
      <ToolFAQ faqs={FAQS} toolName="String Escaper & Unescaper" />
      <RelatedTools currentToolId="string-escaper" category="Text" />
    </div>
  );
};

export default StringEscaperClient;
