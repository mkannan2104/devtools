import { Metadata } from "next";
import Base64EncoderClient from "./Base64EncoderClient";

export const metadata: Metadata = {
  title: "Base64 Encoder Online - Convert Text to Base64 | Developer Workbench",
  description: "Securely encode text or strings to Base64 format online. Fast client-side conversion supporting standard and URL-safe formats with full UTF-8 Unicode character compatibility.",
  keywords: [
    "Base64 Encoder",
    "text to Base64",
    "encode Base64 online",
    "URL-safe Base64 encode",
    "convert text to Base64",
    "Base64 encoder UTF-8",
    "offline Base64 encoder"
  ],
  alternates: {
    canonical: "/base64/encoder",
  },
  openGraph: {
    title: "Base64 Encoder Online - Convert Text to Base64 | Developer Workbench",
    description: "Encode text and JSON payloads into standard or URL-safe Base64 strings. Unicode-compatible, completely local.",
    type: "website",
  }
};

export default function Base64EncoderPage() {
  return <Base64EncoderClient />;
}
