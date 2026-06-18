"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-md rounded-xl border border-border-custom bg-sidebar shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-background px-4 py-2 border-b border-border-custom select-none">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-2xs font-mono text-zinc-500 font-semibold">bash</span>
          <div className="w-12" /> {/* Spacer */}
        </div>

        {/* Terminal Body */}
        <div className="p-6 text-left font-mono text-xs sm:text-sm space-y-4">
          <div>
            <span className="text-emerald-400">guest@dev-dashboard</span>
            <span className="text-zinc-400">:</span>
            <span className="text-brand-blue">~</span>
            <span className="text-zinc-200">$ cd /pages/requested-route</span>
          </div>
          
          <div className="text-red-400 leading-relaxed bg-red-950/20 border border-red-950/40 p-3 rounded">
            bash: cd: /pages/requested-route: No such file or directory.
            <span className="block font-bold mt-1 text-2xs uppercase">ERROR CODE: 404_PAGE_NOT_FOUND</span>
          </div>

          <div className="text-zinc-500 text-xs">
            The link you followed might be broken, or the page has been moved.
          </div>

          <div className="pt-4 border-t border-border-custom/50 flex flex-col sm:flex-row gap-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold px-4.5 py-2 transition-all"
            >
              Dashboard
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 rounded border border-border-custom bg-background/50 hover:bg-background text-zinc-300 text-xs font-semibold px-4.5 py-2 transition-all cursor-pointer"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
