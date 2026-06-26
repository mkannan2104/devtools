"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, FileType, Sparkles, ArrowRight, ChevronDown, BookOpen } from "lucide-react";
import { getToolGuide } from "@/constants/toolGuides";

interface ToolGuideProps {
  toolId: string;
}

export const ToolGuide: React.FC<ToolGuideProps> = ({ toolId }) => {
  const guide = getToolGuide(toolId);
  const [isOpen, setIsOpen] = useState(false);

  if (!guide) return null;

  return (
    <section className="mb-6" aria-label="Tool usage guide">
      <div className="rounded-xl border border-border-custom bg-sidebar/30 overflow-hidden">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-sidebar/50"
        >
          <span className="flex items-center gap-2 text-sm font-bold text-white">
            <BookOpen size={16} className="text-brand-blue shrink-0" aria-hidden="true" />
            Tool usage guide
          </span>
          <ChevronDown
            size={16}
            className={`shrink-0 text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <div className="border-t border-border-custom px-4 pb-4 pt-4 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="rounded-lg border border-border-custom/60 bg-background/40 p-4 space-y-3">
                <h2 className="flex items-center gap-2 text-sm font-bold text-white">
                  <Clock size={16} className="text-brand-blue shrink-0" aria-hidden="true" />
                  When to use this tool
                </h2>
                <ul className="space-y-2 text-xs text-zinc-400 leading-relaxed list-disc list-inside">
                  {guide.whenToUse.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-border-custom/60 bg-background/40 p-4 space-y-3">
                <h2 className="flex items-center gap-2 text-sm font-bold text-white">
                  <FileType size={16} className="text-brand-blue shrink-0" aria-hidden="true" />
                  Supported formats
                </h2>
                <ul className="space-y-2 text-xs text-zinc-400 leading-relaxed list-disc list-inside">
                  {guide.supportedFormats.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-border-custom/60 bg-background/40 p-4 space-y-3">
                <h2 className="flex items-center gap-2 text-sm font-bold text-white">
                  <Sparkles size={16} className="text-brand-blue shrink-0" aria-hidden="true" />
                  Advantages
                </h2>
                <ul className="space-y-2 text-xs text-zinc-400 leading-relaxed list-disc list-inside">
                  {guide.advantages.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {guide.relatedLinks && guide.relatedLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="text-xs font-semibold text-zinc-400">Related workflows:</span>
                {guide.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-1 rounded-full border border-border-custom bg-sidebar/50 px-3 py-1 text-xs font-semibold text-zinc-300 hover:text-brand-blue hover:border-brand-blue/40 transition-colors"
                  >
                    {link.label}
                    <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ToolGuide;
