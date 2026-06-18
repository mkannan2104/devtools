import { Metadata } from "next";
import JSONViewerClient from "./JSONViewerClient";

export const metadata: Metadata = {
  title: "JSON Viewer Online - Interactive Tree View Inspector | Developer Workbench",
  description: "Explore complex JSON objects with our interactive, collapsible tree view. Search and filter fields, fold nested keys, and inspect arrays in real-time. 100% private and runs offline.",
  keywords: [
    "JSON Viewer",
    "JSON tree viewer",
    "JSON inspector",
    "JSON explorer",
    "read JSON online",
    "collapsible JSON viewer",
    "offline JSON tree"
  ],
  alternates: {
    canonical: "/json/viewer",
  },
  openGraph: {
    title: "JSON Viewer Online - Interactive Tree View Inspector | Developer Workbench",
    description: "Inspect complex JSON data structures using a nested collapsible tree view. Search keys/values client-side.",
    type: "website",
  }
};

export default function JSONViewerPage() {
  return <JSONViewerClient />;
}
