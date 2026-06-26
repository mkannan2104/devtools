"use client";

import React, { useState, useEffect } from "react";
import MonacoInput from "@/components/editors/MonacoInput";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolGuide from "@/components/tools/ToolGuide";
import ToolSchema from "@/components/tools/ToolSchema";
import ToolExamples, { ToolExample } from "@/components/tools/ToolExamples";
import ToolFAQ, { FAQItem } from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";
import { Play, AlertCircle, Info, Hash, CheckCircle } from "lucide-react";

interface MatchResult {
  text: string;
  index: number;
  length: number;
  groups: string[];
}

const EXAMPLES: ToolExample[] = [
  {
    title: "Email Matcher",
    description: "Extract valid email addresses from blocks of logs or texts.",
    content: "PATTERN: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\nFLAGS: g,i\nTEXT: Contact us at support@example.com or info.admin@test-company.org for assistance. Email sales@company.co for pricing."
  },
  {
    title: "UUID Detector",
    description: "Match 36-character UUID/GUID sequences.",
    content: "PATTERN: [0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\nFLAGS: g\nTEXT: Service started with session 123e4567-e89b-12d3-a456-426614174000. Error occurred on transaction 9f8e7d6c-5b4a-3f2e-1d0c-9b8a7f6e5d4c."
  },
  {
    title: "HTML Tag Capturer",
    description: "Parse tags and capture tag names and inner text values.",
    content: "PATTERN: <([a-zA-Z0-9]+)>(.*?)<\\/\\1>\nFLAGS: g,i\nTEXT: <h1>Welcome</h1><p>This is a <strong>paragraph</strong> of text.</p><div>Goodbye</div>"
  }
];

const FAQS: FAQItem[] = [
  {
    question: "What is a Regex Tester?",
    answer: "A Regex Tester is an interactive editor that allows you to write Regular Expressions (Regex) and test them against custom target strings. It validates the expression syntax and displays matching substrings, start/end index boundaries, and captured groups."
  },
  {
    question: "What do the regex flags (g, i, m, s) do?",
    answer: "Flags modify the regex engine search rules: 'g' (global) finds all matches instead of stopping at the first; 'i' (ignore case) performs case-insensitive comparisons; 'm' (multiline) treats start/end anchors (^/$) as line borders rather than string boundaries; 's' (dotAll) allows the dot (.) token to match newline characters."
  },
  {
    question: "Can I use capture groups?",
    answer: "Yes. Any capturing group defined with parentheses () in your expression is isolated and rendered as sub-items in the matches inspector table, detailing group values and indexes."
  }
];

export const RegexTesterClient: React.FC = () => {
  const [expression, setExpression] = useState("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [testText, setTestText] = useState("Contact us at support@example.com or admin@domain.co.uk.");
  const [flagGlobal, setFlagGlobal] = useState(true);
  const [flagIgnoreCase, setFlagIgnoreCase] = useState(true);
  const [flagMultiline, setFlagMultiline] = useState(false);
  const [flagDotAll, setFlagDotAll] = useState(false);

  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [regexError, setRegexError] = useState<string | null>(null);
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

  const performRegexTest = () => {
    if (!expression) {
      setMatches([]);
      setRegexError(null);
      return;
    }

    try {
      const flags = 
        (flagGlobal ? "g" : "") + 
        (flagIgnoreCase ? "i" : "") + 
        (flagMultiline ? "m" : "") + 
        (flagDotAll ? "s" : "");
      
      const regex = new RegExp(expression, flags);
      const results: MatchResult[] = [];
      setRegexError(null);

      if (flagGlobal) {
        let match;
        // Avoid infinite loop on zero-width matches
        while ((match = regex.exec(testText)) !== null) {
          results.push({
            text: match[0],
            index: match.index,
            length: match[0].length,
            groups: match.slice(1)
          });
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testText);
        if (match) {
          results.push({
            text: match[0],
            index: match.index,
            length: match[0].length,
            groups: match.slice(1)
          });
        }
      }

      setMatches(results);
    } catch (err: any) {
      setRegexError(err.message || "Invalid regular expression syntax.");
      setMatches([]);
    }
  };

  useEffect(() => {
    performRegexTest();
  }, [expression, testText, flagGlobal, flagIgnoreCase, flagMultiline, flagDotAll]);

  const handleSelectExample = (content: string) => {
    const lines = content.split("\n");
    const patternLine = lines.find(l => l.startsWith("PATTERN:"));
    const flagsLine = lines.find(l => l.startsWith("FLAGS:"));
    const textLine = lines.find(l => l.startsWith("TEXT:"));

    if (patternLine && textLine) {
      const pat = patternLine.replace("PATTERN:", "").trim();
      const txt = textLine.replace("TEXT:", "").trim();
      
      setExpression(pat);
      setTestText(txt);

      if (flagsLine) {
        const flags = flagsLine.replace("FLAGS:", "").trim();
        setFlagGlobal(flags.includes("g"));
        setFlagIgnoreCase(flags.includes("i"));
        setFlagMultiline(flags.includes("m"));
        setFlagDotAll(flags.includes("s"));
      } else {
        setFlagGlobal(false);
        setFlagIgnoreCase(false);
        setFlagMultiline(false);
        setFlagDotAll(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <ToolHeader
        title="Regex Tester Online"
        category="Regex"
        description="Write and test regular expressions in real-time. Inspect matches, character counts, capture groups, and validation patterns client-side. Includes syntax error tracking."
        iconName="Regex"
        externalUrl="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions"
        externalUrlLabel="MDN Regular Expressions Reference Guide"
      />
      <ToolSchema toolId="regex-tester" />
      <ToolGuide toolId="regex-tester" />

      {/* Regex Input & Flags Configuration */}
      <div className="flex flex-col gap-4 rounded-lg border border-border-custom bg-sidebar/40 p-4 shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Expression Text Box */}
          <div className="flex-1 flex items-center gap-2 bg-background border border-border-custom rounded-md px-3 py-1.5 focus-within:border-brand-blue transition-all">
            <span className="text-zinc-500 font-mono font-bold text-sm">/</span>
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="Enter regular expression pattern (e.g. [a-z]+)"
              className="flex-1 bg-transparent text-sm text-zinc-100 font-mono outline-none placeholder-zinc-600"
            />
            <span className="text-zinc-500 font-mono font-bold text-sm">/</span>
          </div>

          {/* Flags Selection */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-400 select-none">
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={flagGlobal}
                onChange={(e) => setFlagGlobal(e.target.checked)}
                className="rounded border-border-custom text-brand-blue bg-background focus:ring-0"
              />
              <span>g (global)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={flagIgnoreCase}
                onChange={(e) => setFlagIgnoreCase(e.target.checked)}
                className="rounded border-border-custom text-brand-blue bg-background focus:ring-0"
              />
              <span>i (ignoreCase)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={flagMultiline}
                onChange={(e) => setFlagMultiline(e.target.checked)}
                className="rounded border-border-custom text-brand-blue bg-background focus:ring-0"
              />
              <span>m (multiline)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={flagDotAll}
                onChange={(e) => setFlagDotAll(e.target.checked)}
                className="rounded border-border-custom text-brand-blue bg-background focus:ring-0"
              />
              <span>s (dotAll)</span>
            </label>
          </div>
        </div>

        {/* Syntax Error Report */}
        {regexError && (
          <div className="flex items-start gap-2 border border-red-950 bg-red-950/20 px-3 py-2 rounded text-xs text-red-400 font-medium">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span>Regex Format Error: {regexError}</span>
          </div>
        )}
      </div>

      {/* Main Grid: Input Test Text and Match Results */}
      {mounted && isMobile ? (
        <div className="space-y-4">
          <div className="flex rounded-lg border border-border-custom bg-sidebar overflow-hidden shrink-0">
            <button
              onClick={() => setActiveTab("input")}
              className={`flex-1 py-2.5 text-center text-xs font-semibold border-r border-border-custom/50 transition-all ${
                activeTab === "input" ? "bg-background/80 text-white font-bold" : "text-zinc-400 hover:bg-zinc-800/30"
              }`}
            >
              Test Text (Input)
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`flex-1 py-2.5 text-center text-xs font-semibold transition-all ${
                activeTab === "output" ? "bg-background/80 text-white font-bold" : "text-zinc-400 hover:bg-zinc-800/30"
              }`}
            >
              Matches ({matches.length})
            </button>
          </div>

          <div className="h-[570px]">
            {activeTab === "input" ? (
              <MonacoInput
                value={testText}
                onChange={setTestText}
                language="text"
                title="Test Text String"
                placeholder="Enter search test text here..."
              />
            ) : (
              <div className="flex flex-col h-full rounded-lg border border-border-custom bg-sidebar overflow-hidden shadow-lg">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-custom bg-background/50">
                  <span className="text-sm font-semibold tracking-wide text-zinc-300">Matches List</span>
                  <span className="flex items-center gap-1 text-xs text-brand-blue font-bold bg-brand-blue/10 border border-brand-blue/25 px-2 py-0.5 rounded">
                    <Hash size={12} />
                    {matches.length} Matches Found
                  </span>
                </div>

                <div className="flex-1 overflow-auto p-4 space-y-3">
                  {matches.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 space-y-2">
                      <Info size={32} className="text-zinc-600" />
                      <p className="text-sm">No matches found.</p>
                      <p className="text-xs max-w-[250px]">Refine your regular expression or review search flags above.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {matches.map((match, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded bg-background/40 border border-border-custom hover:border-zinc-700 transition-colors space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-2xs font-semibold text-zinc-500">
                            <span>Match #{idx + 1}</span>
                            <span>Index: {match.index} (Len: {match.length})</span>
                          </div>
                          
                          <div className="text-sm font-mono text-emerald-400 bg-background px-2 py-1 rounded border border-border-custom/50 break-all select-all">
                            {match.text}
                          </div>

                          {match.groups && match.groups.length > 0 && match.groups.some(g => g !== undefined) && (
                            <div className="mt-2 space-y-1 pt-1.5 border-t border-border-custom/30">
                              <span className="block text-2xs font-bold text-zinc-500 uppercase">Capture Groups</span>
                              <div className="grid grid-cols-1 gap-1 pl-2">
                                {match.groups.map((group, gIdx) => (
                                  <div key={gIdx} className="text-2xs font-mono text-zinc-400">
                                    <span className="text-zinc-500 font-semibold">Group ${gIdx + 1}: </span>
                                    <span className="text-sky-400 select-all bg-background/30 px-1 py-0.5 rounded">{group !== undefined ? `"${group}"` : "undefined"}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {/* Test Text Monaco Input */}
          <div className="h-[570px]">
            <MonacoInput
              value={testText}
              onChange={setTestText}
              language="text"
              title="Test Text String"
              placeholder="Enter search test text here..."
            />
          </div>

          {/* Results Panel */}
          <div className="flex flex-col h-[570px] rounded-lg border border-border-custom bg-sidebar overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-custom bg-background/50">
              <span className="text-sm font-semibold tracking-wide text-zinc-300">Matches List</span>
              <span className="flex items-center gap-1 text-xs text-brand-blue font-bold bg-brand-blue/10 border border-brand-blue/25 px-2 py-0.5 rounded">
                <Hash size={12} />
                {matches.length} Matches Found
              </span>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-3">
              {matches.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 space-y-2">
                  <Info size={32} className="text-zinc-600" />
                  <p className="text-sm">No matches found.</p>
                  <p className="text-xs max-w-[250px]">Refine your regular expression or review search flags above.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {matches.map((match, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded bg-background/40 border border-border-custom hover:border-zinc-700 transition-colors space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-2xs font-semibold text-zinc-500">
                        <span>Match #{idx + 1}</span>
                        <span>Index: {match.index} (Len: {match.length})</span>
                      </div>
                      
                      {/* Matching String */}
                      <div className="text-sm font-mono text-emerald-400 bg-background px-2 py-1 rounded border border-border-custom/50 break-all select-all">
                        {match.text}
                      </div>

                      {/* Capture Groups */}
                      {match.groups && match.groups.length > 0 && match.groups.some(g => g !== undefined) && (
                        <div className="mt-2 space-y-1 pt-1.5 border-t border-border-custom/30">
                          <span className="block text-2xs font-bold text-zinc-500 uppercase">Capture Groups</span>
                          <div className="grid grid-cols-1 gap-1 pl-2">
                            {match.groups.map((group, gIdx) => (
                              <div key={gIdx} className="text-2xs font-mono text-zinc-400">
                                <span className="text-zinc-500 font-semibold">Group ${gIdx + 1}: </span>
                                <span className="text-sky-400 select-all bg-background/30 px-1 py-0.5 rounded">{group !== undefined ? `"${group}"` : "undefined"}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ToolExamples examples={EXAMPLES} onSelect={handleSelectExample} />
      <ToolFAQ faqs={FAQS} toolName="Regex Tester" />
      <RelatedTools currentToolId="regex-tester" category="Regex" />
    </div>
  );
};

export default RegexTesterClient;
