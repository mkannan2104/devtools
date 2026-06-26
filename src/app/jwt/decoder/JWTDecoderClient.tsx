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
import { Key, Clock, AlertTriangle, ShieldCheck, ShieldAlert, Cpu } from "lucide-react";

const EXAMPLES: ToolExample[] = [
  {
    title: "Standard HS256 Token",
    description: "A typical HMAC-SHA256 authenticated user session token with user claims.",
    content: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjI2OTQ4OTI4MDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  },
  {
    title: "Expired RS256 Token",
    description: "An expired RSA-SHA256 signature token demonstrating token expiry warning states.",
    content: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzAyNDAiLCJpc3MiOiJhdXRoMCIsImlhdCI6MTYyMzg4MDAwMCwiZXhwIjoxNjIzODgzNjAwfQ.dGVzdF9zaWduYXR1cmVfZm9yX3JzYV9hbGdvcml0aG1fdG9rZW4"
  }
];

const FAQS: FAQItem[] = [
  {
    question: "What is a JSON Web Token (JWT)?",
    answer: "A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed."
  },
  {
    question: "Does decoding a JWT online compromise my security?",
    answer: "Using our JWT Decoder is completely safe because decoding happens entirely in your browser using local client-side Javascript. Your token is never uploaded, logged, or sent to a server."
  },
  {
    question: "How is a JWT structured?",
    answer: "A JWT is composed of three parts separated by dots (Header.Payload.Signature). The Header specifies the algorithm and token type, the Payload contains claims (like user info and expiration), and the Signature is used to verify the sender and integrity."
  },
  {
    question: "Does this tool verify the JWT signature?",
    answer: "No. Signature verification requires the corresponding secret key or public certificate. This tool decodes the token claims client-side to inspect payload values but does not verify cryptographic authenticity."
  }
];

interface DecodedToken {
  header: string;
  payload: string;
  alg?: string;
  expTime?: string;
  isExpired?: boolean;
  claimsCount?: number;
}

export const JWTDecoderClient: React.FC = () => {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);
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

  const decodeBase64Url = (str: string): string => {
    try {
      let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4) {
        base64 += "=";
      }
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return new TextDecoder().decode(bytes);
    } catch {
      throw new Error("Invalid Base64Url encoding");
    }
  };

  const handleDecode = (value: string) => {
    setToken(value);
    const trimmedToken = value.trim();

    if (!trimmedToken) {
      setDecoded(null);
      setError(null);
      return;
    }

    const parts = trimmedToken.split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT structure. A JWT must consist of three parts separated by dots (Header.Payload.Signature).");
      setDecoded(null);
      return;
    }

    try {
      const headerDecoded = decodeBase64Url(parts[0]);
      const payloadDecoded = decodeBase64Url(parts[1]);

      const headerObj = JSON.parse(headerDecoded);
      const payloadObj = JSON.parse(payloadDecoded);

      const alg = headerObj.alg || "Unknown";
      
      let expTime: string | undefined;
      let isExpired = false;
      if (payloadObj.exp) {
        const date = new Date(payloadObj.exp * 1000);
        expTime = date.toLocaleString();
        isExpired = date.getTime() < Date.now();
      }

      setDecoded({
        header: JSON.stringify(headerObj, null, 2),
        payload: JSON.stringify(payloadObj, null, 2),
        alg,
        expTime,
        isExpired,
        claimsCount: Object.keys(payloadObj).length
      });
      setError(null);
    } catch (err: any) {
      setError(`Failed to decode token parts. Please ensure it is a valid Base64Url string. Error: ${err.message}`);
      setDecoded(null);
    }
  };

  return (
    <div className="space-y-6">
      <ToolHeader
        title="JWT Decoder Online"
        category="JWT"
        description="Decode and inspect JSON Web Tokens (JWT) client-side. Instantly extract token algorithms, expiration dates, issue dates, and metadata payloads securely without sending tokens to any server."
        iconName="Key"
        externalUrl="https://datatracker.ietf.org/doc/html/rfc7519"
        externalUrlLabel="IETF RFC 7519 (JSON Web Token Specification)"
      />
      <ToolSchema toolId="jwt-decoder" />
      <ToolGuide toolId="jwt-decoder" />

      {mounted && isMobile ? (
        <div className="space-y-4">
          <div className="flex rounded-lg border border-border-custom bg-sidebar overflow-hidden shrink-0">
            <button
              onClick={() => setActiveTab("input")}
              className={`flex-1 py-2.5 text-center text-xs font-semibold border-r border-border-custom/50 transition-all ${
                activeTab === "input" ? "bg-background/80 text-white font-bold" : "text-zinc-400 hover:bg-zinc-800/30"
              }`}
            >
              Encoded Token (Input)
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`flex-1 py-2.5 text-center text-xs font-semibold transition-all ${
                activeTab === "output" ? "bg-background/80 text-white font-bold" : "text-zinc-400 hover:bg-zinc-800/30"
              }`}
            >
              Decoded Claims
            </button>
          </div>

          <div className="min-h-[670px]">
            {activeTab === "input" ? (
              <div className="h-[670px]">
                <MonacoInput
                  value={token}
                  onChange={handleDecode}
                  language="text"
                  title="Encoded JWT (Paste Token)"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                />
              </div>
            ) : (
              <div className="flex flex-col h-full space-y-4">
                {!decoded && !error && (
                  <div className="rounded-lg border border-border-custom bg-sidebar/20 p-6 flex flex-col items-center justify-center text-center text-zinc-500 space-y-2 min-h-[300px]">
                    <Key size={32} className="text-zinc-600" />
                    <p className="text-sm">Waiting for Token...</p>
                    <p className="text-xs">Paste an encoded JWT in the Input tab to decode headers and claims.</p>
                  </div>
                )}

                {error && (
                  <div className="rounded-lg border border-red-950 bg-red-950/20 p-6 flex flex-col items-center justify-center text-center text-red-400 space-y-2 min-h-[300px]">
                    <AlertTriangle size={32} className="text-red-500" />
                    <p className="text-sm font-semibold">Decoding Error</p>
                    <p className="text-xs max-w-sm leading-relaxed">{error}</p>
                  </div>
                )}

                {decoded && (
                  <div className="flex flex-col space-y-4 h-full">
                    {/* Expiry and Metadata Card */}
                    <div className="grid grid-cols-1 gap-3 shrink-0">
                      {/* Expiry Card */}
                      <div className={`p-4 rounded-lg border flex items-center gap-3 ${
                        decoded.isExpired 
                          ? "bg-red-950/20 border-red-950 text-red-400" 
                          : decoded.expTime
                            ? "bg-emerald-950/20 border-emerald-950 text-emerald-400"
                            : "bg-zinc-900 border-border-custom text-zinc-400"
                      }`}>
                        <Clock size={20} className="shrink-0" />
                        <div>
                          <span className="block text-2xs text-zinc-500 font-semibold uppercase">Token Expiry</span>
                          <span className="text-xs font-semibold">{decoded.expTime ? decoded.expTime : "No Expiry Claim"}</span>
                          {decoded.isExpired && <span className="block text-2xs font-bold uppercase mt-0.5 text-red-500">Expired Token</span>}
                        </div>
                      </div>

                      {/* Algorithm Card */}
                      <div className="p-4 rounded-lg border border-border-custom bg-sidebar/60 flex items-center gap-3 text-zinc-300">
                        <Cpu size={20} className="text-brand-blue shrink-0" />
                        <div>
                          <span className="block text-2xs text-zinc-500 font-semibold uppercase">Algorithm</span>
                          <span className="text-xs font-semibold">{decoded.alg}</span>
                          <span className="block text-2xs text-zinc-500 mt-0.5">{decoded.claimsCount} claims in payload</span>
                        </div>
                      </div>
                    </div>

                    {/* Decoded Header and Payload Editors */}
                    <div className="grid grid-cols-1 gap-4 min-h-[300px]">
                      <div className="h-[230px]">
                        <MonacoOutput
                          value={decoded.header}
                          language="json"
                          title="Decoded Header"
                        />
                      </div>
                      <div className="h-[350px]">
                        <MonacoOutput
                          value={decoded.payload}
                          language="json"
                          title="Decoded Payload (Claims)"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {/* Input Token Editor */}
          <div className="flex flex-col h-[670px]">
            <MonacoInput
              value={token}
              onChange={handleDecode}
              language="text"
              title="Encoded JWT (Paste Token)"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            />
          </div>

          {/* Decoder Report / Decoded Parts */}
          <div className="flex flex-col h-[670px] space-y-4">
            {!decoded && !error && (
              <div className="flex-1 rounded-lg border border-border-custom bg-sidebar/20 p-6 flex flex-col items-center justify-center text-center text-zinc-500 space-y-2">
                <Key size={32} className="text-zinc-600" />
                <p className="text-sm">Waiting for Token...</p>
                <p className="text-xs">Paste an encoded JWT in the left editor to decode headers and claims.</p>
              </div>
            )}

            {error && (
              <div className="flex-1 rounded-lg border border-red-950 bg-red-950/20 p-6 flex flex-col items-center justify-center text-center text-red-400 space-y-2">
                <AlertTriangle size={32} className="text-red-500" />
                <p className="text-sm font-semibold">Decoding Error</p>
                <p className="text-xs max-w-sm leading-relaxed">{error}</p>
              </div>
            )}

            {decoded && (
              <div className="flex-1 flex flex-col space-y-4 h-full overflow-y-auto pr-1">
                {/* Expiry and Metadata Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
                  {/* Expiry Card */}
                  <div className={`p-4 rounded-lg border flex items-center gap-3 ${
                    decoded.isExpired 
                      ? "bg-red-950/20 border-red-950 text-red-400" 
                      : decoded.expTime
                        ? "bg-emerald-950/20 border-emerald-950 text-emerald-400"
                        : "bg-zinc-900 border-border-custom text-zinc-400"
                  }`}>
                    <Clock size={20} className="shrink-0" />
                    <div>
                      <span className="block text-2xs text-zinc-500 font-semibold uppercase">Token Expiry</span>
                      <span className="text-xs font-semibold">{decoded.expTime ? decoded.expTime : "No Expiry Claim"}</span>
                      {decoded.isExpired && <span className="block text-2xs font-bold uppercase mt-0.5 text-red-500">Expired Token</span>}
                    </div>
                  </div>

                  {/* Algorithm Card */}
                  <div className="p-4 rounded-lg border border-border-custom bg-sidebar/60 flex items-center gap-3 text-zinc-300">
                    <Cpu size={20} className="text-brand-blue shrink-0" />
                    <div>
                      <span className="block text-2xs text-zinc-500 font-semibold uppercase">Algorithm</span>
                      <span className="text-xs font-semibold">{decoded.alg}</span>
                      <span className="block text-2xs text-zinc-500 mt-0.5">{decoded.claimsCount} claims in payload</span>
                    </div>
                  </div>
                </div>

                {/* Decoded Header and Payload Editors */}
                <div className="flex-1 grid grid-cols-1 gap-4 min-h-[300px]">
                  <div className="h-[230px]">
                    <MonacoOutput
                      value={decoded.header}
                      language="json"
                      title="Decoded Header"
                    />
                  </div>
                  <div className="h-[350px]">
                    <MonacoOutput
                      value={decoded.payload}
                      language="json"
                      title="Decoded Payload (Claims)"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <ToolExamples examples={EXAMPLES} onSelect={handleDecode} />
      <ToolFAQ faqs={FAQS} toolName="JWT Decoder" />
      <RelatedTools currentToolId="jwt-decoder" category="JWT" />
    </div>
  );
};

export default JWTDecoderClient;
