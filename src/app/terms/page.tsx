import { Metadata } from "next";
import Link from "next/link";
import { Info, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Developer Workbench",
  description: "Read the Terms & Conditions of Developer Workbench. Understand the terms of use for our online local-first developer utilities.",
  alternates: {
    canonical: "/terms",
  }
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      <div className="border-b border-border-custom pb-6">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Info className="text-brand-blue" size={32} />
          Terms & Conditions
        </h1>
        <p className="mt-2 text-zinc-400 text-sm">Last updated: June 18, 2026</p>
      </div>

      <section className="space-y-4 text-sm text-zinc-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
        <p>
          By accessing or using Developer Workbench, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use the website or utilities.
        </p>
      </section>

      <section className="space-y-4 text-sm text-zinc-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white">2. Permitted Use</h2>
        <p>
          Developer Workbench provides free utility tools (such as formatters, validators, generators, and converters) for personal, educational, or professional software development purposes. You may use these tools without limits.
        </p>
      </section>

      <section className="space-y-4 text-sm text-zinc-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white">3. Disclaimer of Warranties</h2>
        <p>
          All tools are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, without warranties of any kind, either express or implied, including but not limited to warranties of accuracy, completeness, reliability, or suitability for a particular database or formatting system.
        </p>
        <div className="rounded-lg border border-amber-950 bg-amber-950/10 p-4 flex gap-3 text-amber-500 text-xs">
          <ShieldAlert size={18} className="shrink-0" />
          <span>
            We do not warrant that formatting is 100% compliant with specific proprietary database syntax rules. Always review critical SQL or JSON queries before applying them to production systems.
          </span>
        </div>
      </section>

      <section className="space-y-4 text-sm text-zinc-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white">4. Limitation of Liability</h2>
        <p>
          In no event shall Developer Workbench, its developers, or its contributors be liable for any direct, indirect, incidental, special, consequential, or punitive damages (including, without limitation, loss of production, data loss, database corruption, or system downtime) arising from your use of or inability to use the tools.
        </p>
      </section>

      <section className="space-y-4 text-sm text-zinc-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white">5. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws applicable in your jurisdiction, without regard to conflict of law principles.
        </p>
      </section>

      <div className="pt-6 border-t border-border-custom text-xs text-zinc-500">
        <p>
          For licensing terms regarding open source components or packages, please review the relevant project documentation or go back to the{" "}
          <Link href="/" className="text-brand-blue hover:underline">
            Home Page
          </Link>.
        </p>
      </div>
    </div>
  );
}
