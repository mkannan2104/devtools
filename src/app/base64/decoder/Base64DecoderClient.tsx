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
import { AlertCircle } from "lucide-react";

const EXAMPLES: ToolExample[] = [
  {
    title: "Standard Base64 String",
    description: "A standard encoded base64 string representing a developer greeting.",
    content: "V2VsY29tZSB0byBEZXZUb29sa2l0IC0gVGhlIHVsdGltYXRlIGxvY2FsIGRldmVsb3BlciBkYXNoYm9hcmQh"
  },
  {
    title: "URL-Safe Base64 String",
    description: "An encoded base64 string containing URL-safe substitutes like '-' and '_' and omitting '='.",
    content: "eyJhdXRoX21ldGhvZCI6InRva2VuIiwidXNlcl9pZCI6Mjk0MTAsInJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0"
  },
  {
    title: "Unicode Emoji String",
    description: "A base64 string representing international characters and emojis.",
    content: "RGV2ZWxvcGVyIFRvb2xraXQg🚀IENvZGUsIERlYnVnICYgQnVpbGQg🌟ICjml6XmnKzoqi4sIO2Varq17Ja0LCDkuK3mloEsIEVzcGHDsW9sKQ=="
  }
];

const FAQS: FAQItem[] = [
  {
    question: "What is Base64 Decoding?",
    answer: "Base64 decoding is the reverse of encoding; it translates a base64-encoded ASCII string back into the original raw text or binary data. The input string must only contain standard base64 characters (A-Z, a-z, 0-9, +, /, and padding =)."
  },
  {
    question: "How does this decoder handle URL-safe base64 strings?",
    answer: "Our tool automatically detects URL-safe Base64 strings. It replaces '-' with '+' and '_' with '/', and appends the necessary padding '=' characters dynamically before performing decoding."
  },
  {
    question: "What happens if I paste invalid Base64?",
    answer: "If the input contains invalid characters (like spaces or symbols outside the base64 character set) or is corrupted, the tool displays a warning alert notifying you of the syntax error."
  }
];

export const Base64DecoderClient: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
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

  const decodeBase64 = (val: string) => {
    if (!val.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      // Normalize URL safe base64
      let base64 = val.trim().replace(/-/g, "+").replace(/_/g, "/");
      
      // Auto pad missing equals
      while (base64.length % 4) {
        base64 += "=";
      }

      // Check for invalid base64 characters
      if (/[^A-Za-z0-9+/=]/.test(base64)) {
        throw new Error("Input contains invalid characters that are not part of the Base64 alphabet.");
      }

      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      
      const decoded = new TextDecoder().decode(bytes);
      setOutput(decoded);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to decode Base64 string. Please check formatting.");
      setOutput("");
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    decodeBase64(value);
  };

  return (
    <div className="space-y-6">
      <ToolHeader
        title="Base64 Decoder Online"
        category="Base64"
        description="Decode Base64 encoded strings back to clean plain text format instantly. Supports standard and URL-safe Base64 inputs with full UTF-8 Unicode character support client-side."
        iconName="ArrowDownLeft"
        externalUrl="https://datatracker.ietf.org/doc/html/rfc4648"
        externalUrlLabel="IETF RFC 4648 (Base64 encoding standards)"
      />
      <ToolSchema toolId="base64-decoder" />
      <ToolGuide toolId="base64-decoder" />

      {/* Error Panel */}
      {error && (
        <div className="rounded-lg border border-red-950 bg-red-950/20 p-4 text-xs font-semibold text-red-400 flex items-center gap-2">
          <AlertCircle size={16} className="text-red-500 shrink-0" />
          <span>Error: {error}</span>
        </div>
      )}

      {/* Editors */}
      {mounted && isMobile ? (
        <div className="space-y-4">
          <div className="flex rounded-lg border border-border-custom bg-sidebar overflow-hidden shrink-0">
            <button
              onClick={() => setActiveTab("input")}
              className={`flex-1 py-2.5 text-center text-xs font-semibold border-r border-border-custom/50 transition-all ${
                activeTab === "input" ? "bg-background/80 text-white font-bold" : "text-zinc-400 hover:bg-zinc-800/30"
              }`}
            >
              Base64 Input
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`flex-1 py-2.5 text-center text-xs font-semibold transition-all ${
                activeTab === "output" ? "bg-background/80 text-white font-bold" : "text-zinc-400 hover:bg-zinc-800/30"
              }`}
            >
              Decoded Text (Output)
            </button>
          </div>

          <div className="h-[550px]">
            {activeTab === "input" ? (
              <MonacoInput
                value={input}
                onChange={handleInputChange}
                language="text"
                title="Base64 Encoded Input"
                placeholder="Paste your Base64 string here..."
              />
            ) : (
              <MonacoOutput
                value={output}
                language="text"
                title="Decoded Plain Text"
                downloadFilename="decoded_text.txt"
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
              title="Base64 Encoded Input"
              placeholder="Paste your Base64 string here..."
            />
          </div>
          <div className="h-[550px]">
            <MonacoOutput
              value={output}
              language="text"
              title="Decoded Plain Text"
              downloadFilename="decoded_text.txt"
            />
          </div>
        </div>
      )}

      <ToolExamples examples={EXAMPLES} onSelect={handleInputChange} />
      <ToolFAQ faqs={FAQS} toolName="Base64 Decoder" />
      <RelatedTools currentToolId="base64-decoder" category="Base64" />
    </div>
  );
};

export default Base64DecoderClient;
