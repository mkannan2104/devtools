import { Metadata } from "next";
import JSONValidatorClient from "./JSONValidatorClient";

export const metadata: Metadata = {
  title: "JSON Validator Online - Check & Lint JSON Syntax | DevDashboard",
  description: "Check if your JSON data is valid with our online JSON Validator and Linter. Get clear error messages, line numbers, and character positions in real-time. 100% secure client-side validation.",
  keywords: [
    "JSON Validator",
    "JSON Linter",
    "validate JSON",
    "check JSON online",
    "JSON syntax checker",
    "fix JSON error",
    "JSON parser online"
  ],
  alternates: {
    canonical: "/json/validator",
  },
  openGraph: {
    title: "JSON Validator Online - Check & Lint JSON Syntax | DevDashboard",
    description: "Validate JSON syntax client-side with precise line-number error highlights. Privacy-first, zero server hits.",
    type: "website",
  }
};

export default function JSONValidatorPage() {
  return <JSONValidatorClient />;
}
