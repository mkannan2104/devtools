import React from "react";
import { Play } from "lucide-react";

export interface ToolExample {
  title: string;
  description: string;
  content: string;
}

interface ToolExamplesProps {
  examples: ToolExample[];
  onSelect: (content: string) => void;
}

export const ToolExamples: React.FC<ToolExamplesProps> = ({ examples, onSelect }) => {
  if (examples.length === 0) return null;

  return (
    <div className="mt-10 border-t border-border-custom pt-8">
      <h2 className="text-lg font-bold text-white mb-4">Try with Examples</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {examples.map((example, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(example.content)}
            className="flex flex-col text-left p-4 rounded-lg border border-border-custom bg-sidebar/40 hover:bg-sidebar hover:border-brand-blue/50 transition-all group"
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-sm font-semibold text-zinc-200 group-hover:text-brand-blue transition-colors">
                {example.title}
              </span>
              <Play size={12} className="text-zinc-500 group-hover:text-brand-blue transition-colors" />
            </div>
            <span className="text-xs text-zinc-500 line-clamp-2">
              {example.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToolExamples;
