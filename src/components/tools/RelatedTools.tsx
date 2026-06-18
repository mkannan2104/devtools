import React from "react";
import Link from "next/link";
import { TOOLS, Tool } from "@/constants/tools";
import Icon from "@/components/layout/Icon";
import { ArrowRight } from "lucide-react";

interface RelatedToolsProps {
  currentToolId: string;
  category: string;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ currentToolId, category }) => {
  // Find related tools: first matching category, then others if we need more to make it 3
  let related = TOOLS.filter(t => t.id !== currentToolId && t.category === category);
  
  if (related.length < 3) {
    const remaining = TOOLS.filter(t => t.id !== currentToolId && t.category !== category);
    related = [...related, ...remaining].slice(0, 3);
  } else {
    related = related.slice(0, 3);
  }

  return (
    <div className="mt-12 border-t border-border-custom pt-8">
      <h2 className="text-lg font-bold text-white mb-6">Related Utilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((tool) => (
          <Link
            key={tool.id}
            href={tool.path}
            className="flex items-center justify-between p-4 rounded-lg border border-border-custom bg-sidebar/20 hover:bg-sidebar/40 hover:border-brand-blue/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-zinc-800/80 p-2 text-zinc-400 group-hover:text-brand-blue transition-colors">
                <Icon name={tool.iconName} size={18} />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                  {tool.title}
                </div>
                <div className="text-xs text-zinc-500">{tool.category}</div>
              </div>
            </div>
            <ArrowRight size={14} className="text-zinc-600 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedTools;
