import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, HelpCircle, Key, Terminal, Code, Cpu, ExternalLink } from "lucide-react";
import { TOOLS } from "@/constants/tools";
import { createStaticPageMetadata } from "@/lib/seo/metadata";
import Icon from "@/components/layout/Icon";

export const metadata: Metadata = createStaticPageMetadata({
  title: "Documentation & User Guide | Developer Workbench",
  description:
    "Read the Developer Workbench documentation. Learn how our client-side JSON formatters, JWT decoders, regex testers, and database utilities process your data offline.",
  path: "/docs",
});

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      <div className="border-b border-border-custom pb-6">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <BookOpen className="text-brand-blue" size={32} aria-hidden="true" />
          Developer Workbench Documentation
        </h1>
        <p className="mt-2 text-zinc-400 text-sm">
          A comprehensive developer guide detailing our local-first, privacy-first conversion dashboard.
        </p>
      </div>

      {/* All tools quick links */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">All Tools</h2>
        <p className="text-sm text-zinc-400">
          Jump directly to any utility. Every tool runs in your browser with no login required.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href={tool.path}
              className="flex items-center gap-3 rounded-lg border border-border-custom bg-sidebar/30 p-4 hover:border-brand-blue/40 hover:bg-sidebar/50 transition-all group"
            >
              <div className="rounded-md bg-zinc-800 p-2 text-zinc-400 group-hover:text-brand-blue transition-colors shrink-0">
                <Icon name={tool.iconName} size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-zinc-200 group-hover:text-white">
                  {tool.title}
                </div>
                <div className="text-xs text-zinc-500 truncate">{tool.description}</div>
              </div>
              <ExternalLink size={14} className="text-zinc-600 group-hover:text-brand-blue shrink-0" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Cpu className="text-zinc-400" size={20} aria-hidden="true" />
          1. Architecture Overview
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Developer Workbench runs entirely inside your browser sandbox. Unlike other tool suites, we perform all parsing, formatting, and cryptography in local JavaScript.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded bg-sidebar/50 border border-border-custom space-y-1">
            <h3 className="font-bold text-zinc-200">Zero Server Hits</h3>
            <p className="text-zinc-400">Payload data is never transmitted across the network, resolving client confidentiality or compliance conflicts.</p>
          </div>
          <div className="p-4 rounded bg-sidebar/50 border border-border-custom space-y-1">
            <h3 className="font-bold text-zinc-200">Offline Functionality</h3>
            <p className="text-zinc-400">Once loaded, the tools continue running even if your network connection drops. Ideal for offline coding work.</p>
          </div>
          <div className="p-4 rounded bg-sidebar/50 border border-border-custom space-y-1">
            <h3 className="font-bold text-zinc-200">Hybrid UI Engine</h3>
            <p className="text-zinc-400">Upgrades smoothly from lightweight textareas on mobile viewports to Monaco Editors on desktops.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Code className="text-zinc-400" size={20} aria-hidden="true" />
          2. JSON Utility Suite
        </h2>
        <div className="space-y-3 text-sm text-zinc-300">
          <p>The JSON suite includes four separate editors tailored for handling object notations:</p>
          <ul className="list-disc list-inside pl-4 space-y-2 text-zinc-400 text-xs">
            <li>
              <Link href="/json/formatter" className="text-brand-blue hover:underline font-semibold">JSON Formatter</Link>
              : Cleans raw payloads using 2-space, 4-space, or tab formats. Includes a minification toggler.
            </li>
            <li>
              <Link href="/json/validator" className="text-brand-blue hover:underline font-semibold">JSON Validator</Link>
              : Verifies syntax conformance against RFC 8259 specs with line and column error reporting.
            </li>
            <li>
              <Link href="/json/viewer" className="text-brand-blue hover:underline font-semibold">JSON Viewer</Link>
              : Parses objects into an expandable tree hierarchy with a live key/value search filter.
            </li>
            <li>
              <Link href="/json/diff" className="text-brand-blue hover:underline font-semibold">JSON Diff</Link>
              : Compares two objects using a side-by-side diff view with change highlighting.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Key className="text-zinc-400" size={20} aria-hidden="true" />
          3. JWT &amp; Cryptography
        </h2>
        <div className="space-y-3 text-sm text-zinc-300">
          <ul className="list-disc list-inside pl-4 space-y-2 text-zinc-400 text-xs">
            <li>
              <Link href="/jwt/decoder" className="text-brand-blue hover:underline font-semibold">JWT Decoder</Link>
              : Splits JSON Web Tokens into header and payload segments with expiry checks.
            </li>
            <li>
              <Link href="/base64/encoder" className="text-brand-blue hover:underline font-semibold">Base64 Encoder</Link>
              {" / "}
              <Link href="/base64/decoder" className="text-brand-blue hover:underline font-semibold">Decoder</Link>
              : Encodes and decodes text with full UTF-8 Unicode support.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Terminal className="text-zinc-400" size={20} aria-hidden="true" />
          4. Regular Expressions, SQL &amp; Text
        </h2>
        <div className="space-y-3 text-sm text-zinc-300">
          <ul className="list-disc list-inside pl-4 space-y-2 text-zinc-400 text-xs">
            <li>
              <Link href="/regex/tester" className="text-brand-blue hover:underline font-semibold">Regex Tester</Link>
              : Highlights matches, capture groups, and match indices in real time.
            </li>
            <li>
              <Link href="/sql/formatter" className="text-brand-blue hover:underline font-semibold">SQL Formatter</Link>
              : Reorganizes raw SQL with standardized keyword casing and indentation.
            </li>
            <li>
              <Link href="/uuid/generator" className="text-brand-blue hover:underline font-semibold">UUID Generator</Link>
              : Creates cryptographically secure UUID v4 values in single or bulk mode.
            </li>
            <li>
              <Link href="/text/escape" className="text-brand-blue hover:underline font-semibold">String Escaper</Link>
              : Escapes and unescapes text for JSON, HTML, URL, and JavaScript literals.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="text-zinc-400" size={20} aria-hidden="true" />
          5. Frequently Asked Questions
        </h2>
        <div className="space-y-4 text-xs md:text-sm text-zinc-400">
          <div className="space-y-1 bg-sidebar/25 border border-border-custom p-4 rounded">
            <h3 className="font-bold text-zinc-200">How do I verify that my data is not uploaded?</h3>
            <p className="leading-relaxed">
              Open your browser&apos;s Developer Tools (F12), go to the <strong>Network</strong> tab, paste data into an editor, and run the tool. No HTTP requests are triggered by formatting or conversion actions.
            </p>
          </div>
          <div className="space-y-1 bg-sidebar/25 border border-border-custom p-4 rounded">
            <h3 className="font-bold text-zinc-200">Does this support dark mode?</h3>
            <p className="leading-relaxed">
              Yes. Developer Workbench uses a dark-first design natively, with carbon backgrounds and editor color palettes tuned for long sessions.
            </p>
          </div>
        </div>
      </section>

      <div className="pt-6 border-t border-border-custom text-xs text-zinc-400 text-center">
        <p>
          Need support or want to suggest new converters? Contact us at{" "}
          <a href="mailto:ops.devsupport@gmail.com" className="text-brand-blue hover:underline">
            ops.devsupport@gmail.com
          </a>{" "}
          or return to the{" "}
          <Link href="/" className="text-brand-blue hover:underline">
            Home Page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
