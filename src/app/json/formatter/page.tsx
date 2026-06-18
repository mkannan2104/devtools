import { Metadata } from "next";
import JSONFormatterClient from "./JSONFormatterClient";

export const metadata: Metadata = {
  title: "JSON Formatter Online - Beautify & Prettify JSON | Developer Workbench",
  description: "Free online JSON Formatter and beautifier. Format, indent, and prettify raw JSON data instantly in your browser with syntax highlighting. 100% private and runs offline.",
  keywords: [
    "JSON Formatter",
    "JSON Beautifier",
    "JSON Prettifier",
    "format JSON online",
    "minify JSON",
    "JSON lint",
    "offline JSON formatter",
    "privacy-first developer tools"
  ],
  alternates: {
    canonical: "/json/formatter",
  },
  openGraph: {
    title: "JSON Formatter Online - Beautify & Prettify JSON | Developer Workbench",
    description: "Format, indent, and prettify raw JSON data instantly in your browser. Complete client-side conversion, zero server calls.",
    type: "website",
  }
};

export default function JSONFormatterPage() {
  return <JSONFormatterClient />;
}
