import React from "react";
import Link from "next/link";
import { Clock, FileType, Sparkles, ArrowRight } from "lucide-react";
import { getToolGuide } from "@/constants/toolGuides";

interface ToolGuideProps {
  toolId: string;
}

export const ToolGuide: React.FC<ToolGuideProps> = ({ toolId }) => {
  const guide = getToolGuide(toolId);
  if (!guide) return null;

  return (
    <section
      className="mb-10 grid grid-cols-1 lg:grid-cols-3 gap-6"
      aria-label="Tool usage guide"
    >
      <div className="rounded-xl border border-border-custom bg-sidebar/30 p-5 space-y-3">
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

      <div className="rounded-xl border border-border-custom bg-sidebar/30 p-5 space-y-3">
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

      <div className="rounded-xl border border-border-custom bg-sidebar/30 p-5 space-y-3">
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

      {guide.relatedLinks && guide.relatedLinks.length > 0 && (
        <div className="lg:col-span-3 flex flex-wrap items-center gap-3 pt-1">
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
    </section>
  );
};

export default ToolGuide;
