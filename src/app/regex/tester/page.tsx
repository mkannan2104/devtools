import { Metadata } from "next";
import RegexTesterClient from "./RegexTesterClient";

export const metadata: Metadata = {
  title: "Regex Tester Online - Match & Test Regular Expressions | Developer Workbench",
  description: "Interactive online Regular Expression (Regex) tester. Test expressions with matches, capturing groups, and expression validation in real-time. 100% private.",
  keywords: [
    "Regex Tester",
    "regular expression tester",
    "test regex online",
    "regex checker",
    "regex matches",
    "capture groups regex",
    "offline regex tester"
  ],
  alternates: {
    canonical: "/regex/tester",
  },
  openGraph: {
    title: "Regex Tester Online - Match & Test Regular Expressions | Developer Workbench",
    description: "Evaluate regular expressions online with real-time highlights, captured groups, and syntax error alerts.",
    type: "website",
  }
};

export default function RegexTesterPage() {
  return <RegexTesterClient />;
}
