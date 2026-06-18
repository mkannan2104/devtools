import React from "react";
import Link from "next/link";
import { getCategorizedTools } from "@/constants/tools";
import { ShieldCheck, Heart, Terminal } from "lucide-react";

export const Footer: React.FC = () => {
  const categorizedTools = getCategorizedTools();

  return (
    <footer className="mt-auto border-t border-border-custom bg-sidebar/50 text-zinc-400 py-12 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Privacy */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-mono text-lg font-bold text-white">
              <Terminal className="text-brand-blue" size={20} />
              <span>Dev<span className="text-brand-blue">Workbench</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400">
              A comprehensive toolkit of fast, secure, and privacy-first tools designed specifically for developers.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/20 border border-emerald-950/50 rounded-lg p-2.5">
              <ShieldCheck size={18} className="shrink-0 text-emerald-500" />
              <span>All operations run locally in your browser. No data leaves your machine.</span>
            </div>
          </div>

          {/* Links for tools - Col 1 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-4">JSON Utilities</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/json/formatter" className="hover:text-white transition-colors">JSON Formatter</Link>
              </li>
              <li>
                <Link href="/json/validator" className="hover:text-white transition-colors">JSON Validator</Link>
              </li>
              <li>
                <Link href="/json/viewer" className="hover:text-white transition-colors">JSON Viewer</Link>
              </li>
              <li>
                <Link href="/json/diff" className="hover:text-white transition-colors">JSON Diff</Link>
              </li>
            </ul>
          </div>

          {/* Links for tools - Col 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-4">Encoding & Utilities</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/jwt/decoder" className="hover:text-white transition-colors">JWT Decoder</Link>
              </li>
              <li>
                <Link href="/base64/encoder" className="hover:text-white transition-colors">Base64 Encoder</Link>
              </li>
              <li>
                <Link href="/base64/decoder" className="hover:text-white transition-colors">Base64 Decoder</Link>
              </li>
              <li>
                <Link href="/regex/tester" className="hover:text-white transition-colors">Regex Tester</Link>
              </li>
              <li>
                <Link href="/text/escape" className="hover:text-white transition-colors">String Escaper</Link>
              </li>
            </ul>
          </div>

          {/* Links for tools - Col 3 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-4">Additional Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/uuid/generator" className="hover:text-white transition-colors">UUID Generator</Link>
              </li>
              <li>
                <Link href="/sql/formatter" className="hover:text-white transition-colors">SQL Formatter</Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom footer bar */}
        <div className="mt-12 pt-8 border-t border-border-custom flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-zinc-500">
            &copy; 2026 Developer Workbench. All rights reserved. Built for developers, by developers.
          </p>
          <p className="flex items-center gap-1 text-zinc-500">
            Made with <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse" /> for open source.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
