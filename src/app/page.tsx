import { Shield, Zap, Terminal } from "lucide-react";
import HomeToolsExplorer from "./HomeToolsExplorer";

const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do Json Tools tools work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All tools run natively inside your browser. When you paste inputs, they are processed locally in your browser memory using Javascript, yielding immediate results.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Json Tools transfers 0% of your data back to a server or third-party loggers. Ideal for developer credentials, sensitive client payloads, and production database queries.",
      },
    },
    {
      "@type": "Question",
      name: "Are there any paid limits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. In V1, all features, formats, generators, validators, and comparators are 100% free and open without limits or subscription barriers.",
      },
    },
    {
      "@type": "Question",
      name: "Can I work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Once loaded, since no server queries are made, all core conversion operations continue working seamlessly without an internet connection.",
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="space-y-12 py-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FAQ_SCHEMA) }}
      />

      <section className="relative text-center space-y-6 max-w-4xl mx-auto py-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/40 bg-brand-blue/20 px-3 py-1 text-xs font-semibold text-blue-200 mb-4 animate-fade-in">
          <Zap size={14} aria-hidden="true" />
          <span>Speed-Optimized &amp; 100% Client-Side</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Professional{" "}
          <span className="text-brand-blue">Developer Utilities</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          A secure, privacy-first web utility suite of professional developer utilities. All tools run completely offline inside your browser.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs font-semibold text-zinc-400">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-emerald-500" aria-hidden="true" />
            <span>Zero server data transfer</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-amber-500" aria-hidden="true" />
            <span>Instant load times</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-brand-blue" aria-hidden="true" />
            <span>Developer-friendly config</span>
          </div>
        </div>
      </section>

      <HomeToolsExplorer />

      {/* Detailed Overview Section for SEO and Users */}
      <section className="border-t border-border-custom pt-12 space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-white">
            Why Use Local-First Professional Developer Utilities?
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            In modern software development, data privacy and security are paramount. Developers frequently need to format JSON payloads, decode JSON Web Tokens (JWT), verify regular expressions, format SQL queries, or encode string data. However, pasting proprietary code, API keys, or sensitive customer information into standard online converters poses severe security and compliance risks.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Json Tools provides a comprehensive suite of <strong>professional developer utilities</strong> that execute entirely within your browser sandbox. Using advanced client-side processing, no data is ever transmitted to external servers. This local-first design guarantees that your configuration values, authorization headers, database queries, and credentials remain 100% confidential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-zinc-200">Local JSON & Data Formatters</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Managing large JSON objects requires robust and fast tools. Our professional developer utilities include an advanced JSON Formatter with multiple indentation spacing modes, a syntax-conforming JSON Validator that points out precise schema violations, a hierarchical JSON Viewer for object inspection, and a Monaco-powered JSON Diff engine to compare configurations without exposing your private datasets to the web.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-zinc-200">Secure Cryptography & Decoders</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Debugging cryptographic structures like JSON Web Tokens (JWT) or base64-encoded strings requires absolute privacy. Our JWT Decoder parses header metadata and payload claims entirely client-side, showing signature expiration statuses instantly. The Base64 Encoder and Decoder support full UTF-8 encoding patterns and URL-safe conversions without sending security tokens across public networks.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-zinc-200">Regex Testing & Syntax Linters</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Writing complex regular expression patterns often requires iterative testing against sensitive sample text. The integrated Regex Tester lets you write patterns, test capturing groups, and view character indexes in real-time. Similarly, the local SQL Formatter reorganizes structured database scripts and commands, improving code readability while ensuring database schema configurations remain fully local.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-zinc-200">Unique Identifier Generators</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Generating identifiers for relational databases, database migrations, or test fixtures is basic to any development workflow. The client-side UUID Generator outputs RFC-compliant version 4 UUIDs instantly. Since the generation runs in your browser engine using secure cryptographic random values, it is both rapid and safe from collision vulnerabilities.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <h3 className="text-lg font-bold text-zinc-200">Compliance and Offline-Ready Architecture</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Enterprise environments have strict security compliance guidelines (such as SOC2, ISO 27001, and GDPR) which forbid pasting corporate information into random online converters. Json Tools addresses these restrictions by operating as a static offline application. You can load this workbench once and continue utilizing these professional developer utilities in offline mode, airplane mode, or inside restricted intranet environments.
          </p>
        </div>
      </section>

      {/* Platform FAQ Section */}
      <section className="border-t border-border-custom pt-12 space-y-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-extrabold text-white text-center">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg border border-border-custom bg-sidebar/20 space-y-2">
            <h3 className="font-bold text-sm text-zinc-200">
              How do Json Tools tools work?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All tools run natively inside your browser. When you paste inputs,
              they are processed locally in your browser memory using Javascript,
              yielding immediate results.
            </p>
          </div>
          <div className="p-5 rounded-lg border border-border-custom bg-sidebar/20 space-y-2">
            <h3 className="font-bold text-sm text-zinc-200">Is my data secure?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Yes. Json Tools transfers 0% of your data back to a server
              or third-party loggers. Ideal for developer credentials, sensitive
              client payloads, and production database queries.
            </p>
          </div>
          <div className="p-5 rounded-lg border border-border-custom bg-sidebar/20 space-y-2">
            <h3 className="font-bold text-sm text-zinc-200">
              Are there any paid limits?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No. In V1, all features, formats, generators, validators, and
              comparators are 100% free and open without limits or subscription
              barriers.
            </p>
          </div>
          <div className="p-5 rounded-lg border border-border-custom bg-sidebar/20 space-y-2">
            <h3 className="font-bold text-sm text-zinc-200">Can I work offline?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Yes. Once loaded, since no server queries are made, all core
              conversion operations continue working seamlessly without an internet
              connection.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
