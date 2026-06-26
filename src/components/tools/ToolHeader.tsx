import React from "react";
import Icon from "@/components/layout/Icon";

interface ToolHeaderProps {
  title: string;
  category: string;
  description: string;
  iconName: string;
  externalUrl?: string;
  externalUrlLabel?: string;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({
  title,
  category,
  description,
  iconName,
  externalUrl,
  externalUrlLabel
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-custom pb-6 mb-8">
      <div className="space-y-3 max-w-3xl">
        {/* Category & Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 px-2.5 py-0.5 text-xs font-semibold text-blue-200">
            {category}
          </span>
          <span className="text-zinc-400 text-xs">•</span>
          <span className="text-zinc-400 text-xs font-medium">100% Client-Side</span>
        </div>

        {/* Title H1 */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-zinc-800 p-2 text-brand-blue border border-border-custom shrink-0">
            <Icon name={iconName} size={24} />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            {title}
          </h1>
        </div>

        {/* Description (SEO Friendly) */}
        <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
          {description}
          {externalUrl && externalUrlLabel && (
            <span className="block mt-2 text-xs text-zinc-400">
              Reference Spec:{" "}
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:underline font-semibold"
              >
                {externalUrlLabel} &rarr;
              </a>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ToolHeader;
