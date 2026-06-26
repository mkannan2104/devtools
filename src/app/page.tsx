import { Shield, Zap, Terminal } from "lucide-react";
import HomeToolsExplorer from "./HomeToolsExplorer";

const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do Developer Workbench tools work?",
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
        text: "Yes. Developer Workbench transfers 0% of your data back to a server or third-party loggers. Ideal for developer credentials, sensitive client payloads, and production database queries.",
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
          A secure, privacy-first web utility suite for developers. All tools run
          completely offline inside your browser.
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

      <section className="border-t border-border-custom pt-12 space-y-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-extrabold text-white text-center">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg border border-border-custom bg-sidebar/20 space-y-2">
            <h3 className="font-bold text-sm text-zinc-200">
              How do Developer Workbench tools work?
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
              Yes. Developer Workbench transfers 0% of your data back to a server
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
