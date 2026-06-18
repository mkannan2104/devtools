import { Metadata } from "next";
import StringEscaperClient from "./StringEscaperClient";

export const metadata: Metadata = {
  title: "String Escaper & Unescaper Online - JSON, HTML, URL | Developer Workbench",
  description: "Escape or unescape text characters online. Convert strings into JSON escaped literals, URL percent-encoded query parameters, or HTML entities. 100% secure client-side conversion.",
  keywords: [
    "String Escaper",
    "String Unescaper",
    "escape JSON string",
    "URL encode online",
    "HTML entity encoder",
    "HTML decode entities",
    "JS string escaper",
    "unescape string literal",
    "offline string escaper"
  ],
  alternates: {
    canonical: "/text/escape",
  },
  openGraph: {
    title: "String Escaper & Unescaper Online - JSON, HTML, URL | Developer Workbench",
    description: "Safely escape or unescape text characters for JSON payloads, HTML entities, and URL encodings. Complete client-side conversion, zero server logs.",
    type: "website",
  }
};

export default function StringEscaperPage() {
  return <StringEscaperClient />;
}
