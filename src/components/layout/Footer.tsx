"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCategorizedTools } from "@/constants/tools";
import { ShieldCheck, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const categorizedTools = getCategorizedTools();

  return (
    <footer className="mt-auto border-t border-border-custom bg-sidebar/50 text-zinc-400 py-12 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Privacy */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="DevWorkbench Logo"
                width={198}
                height={44}
                loading="lazy"
                className="h-11 w-auto object-contain"
              />
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
          <div className="space-y-1">
            <p className="text-zinc-400">
              &copy; 2026 Developer Workbench. All rights reserved. Developed by <span className="text-zinc-300 font-medium">Mugesh Kannan</span>.
            </p>
            <p className="text-zinc-500">
              Support: <a href="mailto:ops.devsupport@gmail.com" className="text-brand-blue hover:underline">ops.devsupport@gmail.com</a>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/devworkbench_in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors duration-200"
                aria-label="Follow DevWorkbench on X"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/devworkbench?igsh=ZGE1anRtZnh5bDFi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors duration-200"
                aria-label="Follow DevWorkbench on Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.752.052 2.714.124 4.091 1.503 4.215 4.215.044.968.052 1.322.052 3.752c0 2.43-.008 2.784-.052 3.752-.124 2.714-1.503 4.091-4.215 4.215-.968.044-1.322.052-3.752.052-2.43 0-2.784-.008-3.752-.052-2.714-.124-4.091-1.503-4.215-4.215C2.008 15.216 2 14.862 2 12.315c0-2.43.008-2.784.052-3.752.124-2.714 1.503-4.091 4.215-4.215.968-.044 1.322-.052 3.752-.052zm-.315 1.777c-2.39 0-2.705.01-3.649.053-.2.009-.37.018-.545.036-.937.042-1.442.23-1.8.369-.474.184-.812.404-1.168.76-.356.356-.576.694-.76 1.168-.139.358-.327.863-.369 1.8-.018.175-.027.345-.036.545-.043.944-.053 1.259-.053 3.649 0 2.39.01 2.705.053 3.649.009.2.018.37.036.545.042.937.23 1.442.369 1.8.184.474.404.812.76 1.168.356.356.694.576 1.168.76.358.139.863.327 1.8.369.175.018.345.027.545.036.944.043 1.259.053 3.649.053 2.39 0 2.705-.01 3.649-.053.2-.009.37-.018.545-.036.937-.042 1.442-.23 1.8-.369.474-.184.812-.404 1.168-.76.356-.356.576-.694.76-1.168.139-.358.327-.863.369-1.8.018-.175.027-.345.036-.545.043-.944.053-1.259.053-3.649 0-2.39-.01-2.705-.053-3.649-.009-.2-.018-.37-.036-.545-.042-.937-.23-1.442-.369-1.8-.184-.474-.404-.812-.76-1.168-.356-.356-.694-.576-1.168-.76-.358-.139-.863-.327-1.8-.369-.175-.018-.345-.027-.545-.036-.944-.043-1.259-.053-3.649-.053zm0 3.678c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm0 7.943c-1.7 0-3.083-1.383-3.083-3.083 0-1.7 1.383-3.083 3.083-3.083 1.7 0 3.083 1.383 3.083 3.083 0 1.7-1.383 3.083-3.083 3.083zm4.904-9.063c0 .61-.497 1.107-1.107 1.107-.61 0-1.107-.497-1.107-1.107 0-.61.497-1.107 1.107-1.107.61 0 1.107.497 1.107 1.107z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="flex items-center gap-1 text-zinc-500">
              Made with <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse" /> for open source.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


