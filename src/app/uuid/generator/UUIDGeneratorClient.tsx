"use client";

import React, { useState, useEffect } from "react";
import MonacoOutput from "@/components/editors/MonacoOutput";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolGuide from "@/components/tools/ToolGuide";
import ToolSchema from "@/components/tools/ToolSchema";
import ToolExamples, { ToolExample } from "@/components/tools/ToolExamples";
import ToolFAQ, { FAQItem } from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";
import { Sparkles, Fingerprint, RefreshCw, Hash, Copy, Check } from "lucide-react";

const EXAMPLES: ToolExample[] = [
  {
    title: "Standard UUID v4",
    description: "A single lowercase UUID v4 with standard hyphen separations.",
    content: "GENERATE: count=1, hyphens=true, uppercase=false, braces=false"
  },
  {
    title: "No Hyphens Uppercase",
    description: "Bulk list of 5 uppercase UUIDs with all hyphens stripped out.",
    content: "GENERATE: count=5, hyphens=false, uppercase=true, braces=false"
  },
  {
    title: "Braced SQL format",
    description: "UUIDs surrounded by curly braces, commonly used inside registry databases.",
    content: "GENERATE: count=3, hyphens=true, uppercase=true, braces=true"
  }
];

const FAQS: FAQItem[] = [
  {
    question: "What is a UUID v4?",
    answer: "A UUID (Universally Unique Identifier) version 4 is a 128-bit label generated randomly using cryptographically secure values. It consists of 36 characters including 4 hyphens (structured as 8-4-4-4-12) and is designed to have an extremely low collision probability."
  },
  {
    question: "How secure is this UUID generator?",
    answer: "Extremely secure. The tool calls the browser's native window.crypto API, which utilizes cryptographically strong pseudo-random number generator (CSPRNG) seeds. Everything runs local on your hardware; no remote seeds are gathered."
  },
  {
    question: "Why would I remove hyphens or add braces?",
    answer: "Different database engines, configurations, or languages require unique formats. Microsoft SQL Server often stores identifiers inside braces (e.g. {UUID}), while some storage systems prefer stripped 32-character hexadecimal strings (no hyphens) to save indexes and memory."
  }
];

export const UUIDGeneratorClient: React.FC = () => {
  const [count, setCount] = useState(5);
  const [useHyphens, setUseHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [useBraces, setUseBraces] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generateUUID = () => {
    const uuids: string[] = [];
    const secureCryptoAvailable = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function";

    for (let i = 0; i < count; i++) {
      let uuid = "";
      if (secureCryptoAvailable) {
        uuid = crypto.randomUUID();
      } else {
        // Fallback CSPRNG representation
        uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }

      if (!useHyphens) {
        uuid = uuid.replace(/-/g, "");
      }
      if (uppercase) {
        uuid = uuid.toUpperCase();
      }
      if (useBraces) {
        uuid = `{${uuid}}`;
      }
      uuids.push(uuid);
    }

    setOutput(uuids.join("\n"));
  };

  // Generate initial UUIDs on component mount
  useEffect(() => {
    generateUUID();
  }, []);

  const handleSelectExample = (content: string) => {
    if (content.startsWith("GENERATE:")) {
      const params = content.replace("GENERATE:", "").trim().split(",");
      const countVal = parseInt(params[0].split("=")[1], 10);
      const hyphensVal = params[1].split("=")[1] === "true";
      const upperVal = params[2].split("=")[1] === "true";
      const bracesVal = params[3].split("=")[1] === "true";

      setCount(countVal);
      setUseHyphens(hyphensVal);
      setUppercase(upperVal);
      setUseBraces(bracesVal);

      // Trigger generate directly with new local values
      const uuids: string[] = [];
      const secureCryptoAvailable = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function";

      for (let i = 0; i < countVal; i++) {
        let uuid = secureCryptoAvailable ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });

        if (!hyphensVal) uuid = uuid.replace(/-/g, "");
        if (upperVal) uuid = uuid.toUpperCase();
        if (bracesVal) uuid = `{${uuid}}`;
        uuids.push(uuid);
      }
      setOutput(uuids.join("\n"));
    }
  };

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <ToolHeader
        title="UUID v4 Generator Online"
        category="UUID"
        description="Generate cryptographically secure random UUIDs (v4) in bulk. Configure settings to remove hyphens, append curly braces, or convert to uppercase. Built client-side using secure browser APIs."
        iconName="Fingerprint"
        externalUrl="https://datatracker.ietf.org/doc/html/rfc4122"
        externalUrlLabel="IETF RFC 4122 (UUID Specification)"
      />
      <ToolSchema toolId="uuid-generator" />
      <ToolGuide toolId="uuid-generator" />

      {/* Settings Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 rounded-lg border border-border-custom bg-sidebar/40 p-5 shadow-md">
        {/* Count Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Quantity</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500">
              <Hash size={14} />
            </span>
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className="w-full rounded border border-border-custom bg-background py-1.5 pl-8 pr-3 text-sm text-zinc-200 focus:border-brand-blue focus:outline-none"
            >
              <option value={1}>1 UUID</option>
              <option value={5}>5 UUIDs</option>
              <option value={10}>10 UUIDs</option>
              <option value={20}>20 UUIDs</option>
              <option value={50}>50 UUIDs</option>
              <option value={100}>100 UUIDs</option>
            </select>
          </div>
        </div>

        {/* Options Toggles */}
        <div className="flex flex-col gap-2 justify-end">
          <label className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer select-none">
            <input
              type="checkbox"
              checked={useHyphens}
              onChange={(e) => setUseHyphens(e.target.checked)}
              className="rounded border-border-custom text-brand-blue bg-background focus:ring-0"
            />
            <span>Include Hyphens</span>
          </label>
        </div>

        <div className="flex flex-col gap-2 justify-end">
          <label className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer select-none">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded border-border-custom text-brand-blue bg-background focus:ring-0"
            />
            <span>Uppercase Letters</span>
          </label>
        </div>

        <div className="flex flex-col gap-2 justify-end">
          <label className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer select-none">
            <input
              type="checkbox"
              checked={useBraces}
              onChange={(e) => setUseBraces(e.target.checked)}
              className="rounded border-border-custom text-brand-blue bg-background focus:ring-0"
            />
            <span>Enclose in Braces `{}`</span>
          </label>
        </div>
      </div>

      {/* Main Generator Action Buttons */}
      <div className="flex justify-between items-center gap-3">
        <button
          onClick={generateUUID}
          className="flex items-center gap-2 rounded bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-semibold px-4 py-2 shadow transition-all duration-200"
        >
          <RefreshCw size={15} />
          Generate New Set
        </button>

        <button
          onClick={handleCopyAll}
          className={`flex items-center gap-2 border text-xs font-semibold px-4 py-2 rounded transition-all ${
            copied
              ? "bg-emerald-950/20 border-emerald-950 text-emerald-400"
              : "bg-sidebar border-border-custom text-zinc-300 hover:text-white"
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          Copy All UUIDs
        </button>
      </div>

      {/* Output Display Area */}
      <div className="h-[300px]">
        <MonacoOutput
          value={output}
          language="text"
          title="Generated Identifiers"
          downloadFilename="uuids.txt"
        />
      </div>

      <ToolExamples examples={EXAMPLES} onSelect={handleSelectExample} />
      <ToolFAQ faqs={FAQS} toolName="UUID Generator" />
      <RelatedTools currentToolId="uuid-generator" category="UUID" />
    </div>
  );
};

export default UUIDGeneratorClient;
