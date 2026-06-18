import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, HelpCircle, Key, Terminal, Code, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation & User Guide | DevDashboard",
  description: "Read the DevDashboard documentation. Learn how our client-side JSON formatters, JWT decoders, regex testers, and database utilities process your data offline.",
  alternates: {
    canonical: "/docs",
  }
};

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Page Header */}
      <div className="border-b border-border-custom pb-6">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <BookOpen className="text-brand-blue" size={32} />
          DevDashboard Documentation
        </h1>
        <p className="mt-2 text-zinc-400 text-sm">
          A comprehensive developer guide detailing our local-first, privacy-first conversion dashboard.
        </p>
      </div>

      {/* Architecture Overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Cpu className="text-zinc-400" size={20} />
          1. Architectural Architecture
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          DevDashboard runs entirely inside your browser sandbox. Unlike other tool suites, we perform all parsing, formatting, and cryptography in local JavaScript.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded bg-sidebar/50 border border-border-custom space-y-1">
            <h4 className="font-bold text-zinc-200">Zero Server Hits</h4>
            <p className="text-zinc-400">Payload data is never transmitted across the network, resolving client confidentiality or compliance conflicts.</p>
          </div>
          <div className="p-4 rounded bg-sidebar/50 border border-border-custom space-y-1">
            <h4 className="font-bold text-zinc-200">Offline Functionality</h4>
            <p className="text-zinc-400">Once loaded, the tools continue running even if your network connection drops. Ideal for offline coding work.</p>
          </div>
          <div className="p-4 rounded bg-sidebar/50 border border-border-custom space-y-1">
            <h4 className="font-bold text-zinc-200">Hybrid UI Engine</h4>
            <p className="text-zinc-400">Upgrades smoothly from lightweight textareas on mobile viewports to Monaco Editors on desktops.</p>
          </div>
        </div>
      </section>

      {/* JSON Utilities Documentation */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Code className="text-zinc-400" size={20} />
          2. JSON Utility Suite
        </h2>
        <div className="space-y-3 text-sm text-zinc-300">
          <p>
            The JSON suite includes four separate editors tailored for handling object notations:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 text-zinc-400 text-xs">
            <li>
              <strong>JSON Formatter:</strong> Cleans raw payloads using 2-space, 4-space, or tab formats. Includes a minification toggler.
            </li>
            <li>
              <strong>JSON Validator:</strong> Verifies syntax conformance against RFC 8259 specs. Reports the exact line number, column offset, and issue descriptions for syntax errors.
            </li>
            <li>
              <strong>JSON Viewer:</strong> Parses objects into an expandable and collapsible tree hierarchy with a live key/value search filter.
            </li>
            <li>
              <strong>JSON Diff:</strong> Compares two objects using Monaco&apos;s side-by-side text model.
            </li>
          </ul>
        </div>
      </section>

      {/* JWT & Encryption Documentation */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Key className="text-zinc-400" size={20} />
          3. JWT & Cryptography
        </h2>
        <div className="space-y-3 text-sm text-zinc-300">
          <p>
            Tools designed to decrypt, read, or generate signatures safely:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 text-zinc-400 text-xs">
            <li>
              <strong>JWT Decoder:</strong> Splits standard JSON Web Tokens into Header and Payload segments. Automatically checks expiration tags and translates Unix timestamps to local human-readable datetimes.
            </li>
            <li>
              <strong>Base64 Encoder/Decoder:</strong> Encodes text using full UTF-8 Unicode support. Detects and supports URL-safe formatting options.
            </li>
          </ul>
        </div>
      </section>

      {/* General Helpers Documentation */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Terminal className="text-zinc-400" size={20} />
          4. Regular Expressions & Database formatting
        </h2>
        <div className="space-y-3 text-sm text-zinc-300">
          <p>
            General utilities:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 text-zinc-400 text-xs">
            <li>
              <strong>Regex Tester:</strong> Highlights matches inside sample text. Extracts all capturing groups, match index locations, and length counts.
            </li>
            <li>
              <strong>SQL Formatter:</strong> Reorganizes raw SQL statements. Standardizes keywords casing and manages indentation layers for tables and JOIN fragments.
            </li>
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="text-zinc-400" size={20} />
          5. Frequently Asked Questions
        </h2>
        <div className="space-y-4 text-xs md:text-sm text-zinc-400">
          <div className="space-y-1 bg-sidebar/25 border border-border-custom p-4 rounded">
            <h4 className="font-bold text-zinc-200">How do I verify that my data is not uploaded?</h4>
            <p className="leading-relaxed">
              Open your browser&apos;s Developer Tools (F12 or Ctrl+Shift+I), navigate to the <strong>Network</strong> tab, paste sensitive data into the editor, and click format. You will see that no HTTP requests are triggered by formatting actions.
            </p>
          </div>
          <div className="space-y-1 bg-sidebar/25 border border-border-custom p-4 rounded">
            <h4 className="font-bold text-zinc-200">Does this support dark mode?</h4>
            <p className="leading-relaxed">
              Yes. DevDashboard uses a dark-first design configuration natively, utilizing carbon backgrounds and standard editor color palettes.
            </p>
          </div>
        </div>
      </section>

      <div className="pt-6 border-t border-border-custom text-xs text-zinc-500 text-center">
        <p>
          Need support or want to suggest new converters? Return to the{" "}
          <Link href="/" className="text-brand-blue hover:underline">
            Home Page
          </Link>{" "}
          to review all utilities.
        </p>
      </div>
    </div>
  );
}
