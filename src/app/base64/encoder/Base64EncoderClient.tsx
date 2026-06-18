"use client";

import React, { useState, useEffect } from "react";
import MonacoInput from "@/components/editors/MonacoInput";
import MonacoOutput from "@/components/editors/MonacoOutput";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolExamples, { ToolExample } from "@/components/tools/ToolExamples";
import ToolFAQ, { FAQItem } from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";
import { Link2, Sparkles } from "lucide-react";

const EXAMPLES: ToolExample[] = [
  {
    title: "Simple String",
    description: "Standard English sentence to convert into Base64 format.",
    content: "Welcome to Developer Workbench - The ultimate local developer dashboard!"
  },
  {
    title: "UTF-8 Unicode String",
    description: "Text containing international symbols and emojis, requiring UTF-8 encoding support.",
    content: "Developer Dashboard 🚀 Code, Debug & Build 🌟 (日本語, 한국어, 中文, Español)"
  },
  {
    title: "JSON Object",
    description: "A minified JSON payload converted into Base64 format, commonly used in headers.",
    content: '{"auth_method":"token","user_id":29410,"role":"admin","active":true}'
  }
];

const FAQS: FAQItem[] = [
  {
    question: "What is Base64 Encoding?",
    answer: "Base64 is a binary-to-text encoding scheme that translates binary data (like files or images) or text into a sequence of 64 characters: A-Z, a-z, 0-9, +, and /. It is primarily used to transmit binary data over text-based protocols like HTML, email, or HTTP headers."
  },
  {
    question: "What is URL-Safe Base64?",
    answer: "URL-Safe Base64 replaces the characters '+' with '-' and '/' with '_', and omits the trailing '=' padding characters. This makes the resulting encoded string safe to use in URL paths, query parameters, or cookie values without escaping."
  },
  {
    question: "Does this encoder support Unicode/UTF-8?",
    answer: "Yes. Native Javascript btoa fails on non-ASCII characters. Our tool uses a TextEncoder pipeline to safely encode Unicode, emojis, and special international character alphabets into standard UTF-8 Base64 formats."
  }
];

export const Base64EncoderClient: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
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

  const encodeBase64 = (val: string, isUrlSafe = urlSafe) => {
    if (!val) {
      setOutput("");
      return;
    }

    try {
      const bytes = new TextEncoder().encode(val);
      const binary = String.fromCharCode(...Array.from(bytes));
      let base64 = btoa(binary);

      if (isUrlSafe) {
        base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      }
      setOutput(base64);
    } catch (err: any) {
      setOutput(`Encoding Error: ${err.message}`);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    encodeBase64(value, urlSafe);
  };

  const handleToggleUrlSafe = (safe: boolean) => {
    setUrlSafe(safe);
    encodeBase64(input, safe);
  };

  return (
    <div className="space-y-6">
      <ToolHeader
        title="Base64 Encoder Online"
        category="Base64"
        description="Encode text strings or JSON payloads to Base64 format securely. Supports UTF-8 Unicode characters and URL-safe Base64 formatting options completely inside your browser."
        iconName="ArrowUpRight"
        externalUrl="https://datatracker.ietf.org/doc/html/rfc4648"
        externalUrlLabel="IETF RFC 4648 (Base64 encoding standards)"
      />

      {/* Settings Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border-custom bg-sidebar/40 p-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-zinc-400">Encoder Scheme:</label>
          <div className="inline-flex rounded-lg border border-border-custom bg-background p-1">
            <button
              onClick={() => handleToggleUrlSafe(false)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${!urlSafe ? "bg-brand-blue text-white" : "text-zinc-400 hover:text-white"
                }`}
            >
              Standard Base64
            </button>
            <button
              onClick={() => handleToggleUrlSafe(true)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all flex items-center gap-1 ${urlSafe ? "bg-brand-blue text-white" : "text-zinc-400 hover:text-white"
                }`}
            >
              <Link2 size={12} />
              URL-Safe Base64
            </button>
          </div>
        </div>
      </div>

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
              Plain Text (Input)
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`flex-1 py-2.5 text-center text-xs font-semibold transition-all ${
                activeTab === "output" ? "bg-background/80 text-white font-bold" : "text-zinc-400 hover:bg-zinc-800/30"
              }`}
            >
              Base64 Result (Output)
            </button>
          </div>

          <div className="h-[550px]">
            {activeTab === "input" ? (
              <MonacoInput
                value={input}
                onChange={handleInputChange}
                language="text"
                title="Plain Text Input"
                placeholder="Type or paste plain text here to encode..."
              />
            ) : (
              <MonacoOutput
                value={output}
                language="text"
                title="Base64 Encoded Result"
                downloadFilename={urlSafe ? "encoded_urlsafe.txt" : "encoded.txt"}
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
              title="Plain Text Input"
              placeholder="Type or paste plain text here to encode..."
            />
          </div>
          <div className="h-[550px]">
            <MonacoOutput
              value={output}
              language="text"
              title="Base64 Encoded Result"
              downloadFilename={urlSafe ? "encoded_urlsafe.txt" : "encoded.txt"}
            />
          </div>
        </div>
      )}

      <ToolExamples examples={EXAMPLES} onSelect={handleInputChange} />
      <ToolFAQ faqs={FAQS} toolName="Base64 Encoder" />
      <RelatedTools currentToolId="base64-encoder" category="Base64" />
    </div>
  );
};

export default Base64EncoderClient;
