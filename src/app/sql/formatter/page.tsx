import { Metadata } from "next";
import SQLFormatterClient from "./SQLFormatterClient";

export const metadata: Metadata = {
  title: "SQL Formatter Online - Beautify & Prettify SQL Queries | DevDashboard",
  description: "Online SQL Formatter and SQL beautifier. Prettify and clean complex SQL query scripts with proper indentation and capitalized keywords. 100% private.",
  keywords: [
    "SQL Formatter",
    "SQL beautifier",
    "format SQL online",
    "prettify SQL",
    "PostgreSQL formatter",
    "MySQL formatter",
    "SQL query cleaner",
    "offline SQL formatter"
  ],
  alternates: {
    canonical: "/sql/formatter",
  },
  openGraph: {
    title: "SQL Formatter Online - Beautify & Prettify SQL Queries | DevDashboard",
    description: "Format, indent, and prettify raw SQL queries instantly in your browser. Clean standard spacing, runs offline.",
    type: "website",
  }
};

export default function SQLFormatterPage() {
  return <SQLFormatterClient />;
}
