import { Metadata } from "next";
import UUIDGeneratorClient from "./UUIDGeneratorClient";

export const metadata: Metadata = {
  title: "UUID Generator Online - Generate Secure UUID v4 | Developer Workbench",
  description: "Generate cryptographically secure random UUID v4 strings online. Bulk generation options, customizable casing, and quick copy features for developers.",
  keywords: [
    "UUID Generator",
    "generate UUID online",
    "UUID v4 generator",
    "GUID generator",
    "bulk UUID generator",
    "secure random UUID",
    "offline UUID generator"
  ],
  alternates: {
    canonical: "/uuid/generator",
  },
  openGraph: {
    title: "UUID Generator Online - Generate Secure UUID v4 | Developer Workbench",
    description: "Generate cryptographically secure random UUID v4 identifiers. Multi-format controls, completely client-side.",
    type: "website",
  }
};

export default function UUIDGeneratorPage() {
  return <UUIDGeneratorClient />;
}
