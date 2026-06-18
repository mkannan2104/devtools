import { Metadata } from "next";
import Base64DecoderClient from "./Base64DecoderClient";

export const metadata: Metadata = {
  title: "Base64 Decoder Online - Convert Base64 to Text | DevDashboard",
  description: "Decode Base64 strings back to clean plain text online. Privacy-first, local decoding inside your browser with automatic detection for standard and URL-safe formats.",
  keywords: [
    "Base64 Decoder",
    "decode Base64 online",
    "Base64 to text",
    "convert Base64 to string",
    "URL-safe Base64 decode",
    "Base64 decoder UTF-8",
    "offline Base64 decoder"
  ],
  alternates: {
    canonical: "/base64/decoder",
  },
  openGraph: {
    title: "Base64 Decoder Online - Convert Base64 to Text | DevDashboard",
    description: "Convert encoded standard or URL-safe Base64 strings back to plain text. Unicode-compatible, completely local.",
    type: "website",
  }
};

export default function Base64DecoderPage() {
  return <Base64DecoderClient />;
}
