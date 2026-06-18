import { Metadata } from "next";
import JSONDiffClient from "./JSONDiffClient";

export const metadata: Metadata = {
  title: "JSON Diff Online - Compare JSON Files Side-by-Side | DevDashboard",
  description: "Compare two JSON documents online using our JSON Diff checker. Identify additions, modifications, and deletions side-by-side with color-coded syntax highlights. 100% private.",
  keywords: [
    "JSON Diff",
    "compare JSON",
    "JSON difference online",
    "JSON diff checker",
    "compare JSON files",
    "JSON compare side-by-side",
    "offline JSON compare"
  ],
  alternates: {
    canonical: "/json/diff",
  },
  openGraph: {
    title: "JSON Diff Online - Compare JSON Files Side-by-Side | DevDashboard",
    description: "Compare two JSON documents side-by-side with Monaco's native color comparison. Local in-browser processing.",
    type: "website",
  }
};

export default function JSONDiffPage() {
  return <JSONDiffClient />;
}
