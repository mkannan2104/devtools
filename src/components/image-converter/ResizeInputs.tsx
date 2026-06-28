"use client";

import React from "react";
import { Maximize2, Link as LinkIcon, Link2Off } from "lucide-react";

interface ResizeInputsProps {
  width: string;
  height: string;
  maintainAspectRatio: boolean;
  onWidthChange: (val: string) => void;
  onHeightChange: (val: string) => void;
  onMaintainAspectRatioChange: (val: boolean) => void;
  isBulk: boolean;
}

export const ResizeInputs: React.FC<ResizeInputsProps> = ({
  width,
  height,
  maintainAspectRatio,
  onWidthChange,
  onHeightChange,
  onMaintainAspectRatioChange,
  isBulk,
}) => {
  return (
    <div className="space-y-3 p-4 rounded-lg border border-border-custom bg-sidebar/10">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
          Resize Settings {isBulk && <span className="text-2xs text-brand-blue font-semibold font-mono tracking-normal">(Bulk)</span>}
        </label>
        <span className="text-2xs text-zinc-500">Optional</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Width Input */}
        <div className="space-y-1.5">
          <label className="text-2xs font-semibold text-zinc-500 uppercase">Width (px)</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500 pointer-events-none text-xs font-bold">
              W
            </span>
            <input
              type="number"
              value={width}
              onChange={(e) => onWidthChange(e.target.value)}
              placeholder={isBulk ? "Auto" : "Original"}
              min="1"
              className="w-full rounded border border-border-custom bg-background py-2 pl-8 pr-3 text-sm text-zinc-200 focus:border-brand-blue focus:outline-none h-10"
            />
          </div>
        </div>

        {/* Height Input */}
        <div className="space-y-1.5">
          <label className="text-2xs font-semibold text-zinc-500 uppercase">Height (px)</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500 pointer-events-none text-xs font-bold">
              H
            </span>
            <input
              type="number"
              value={height}
              onChange={(e) => onHeightChange(e.target.value)}
              placeholder={isBulk ? "Auto" : "Original"}
              min="1"
              className="w-full rounded border border-border-custom bg-background py-2 pl-8 pr-3 text-sm text-zinc-200 focus:border-brand-blue focus:outline-none h-10"
            />
          </div>
        </div>
      </div>

      {/* Maintain Aspect Ratio */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2.5 text-xs text-zinc-400 hover:text-white cursor-pointer select-none">
          <div className="relative flex items-center justify-center shrink-0">
            <input
              type="checkbox"
              checked={maintainAspectRatio}
              onChange={(e) => onMaintainAspectRatioChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-4 h-4 rounded border border-border-custom bg-background peer-checked:bg-brand-blue peer-checked:border-brand-blue flex items-center justify-center transition-all duration-150">
              <svg
                className="w-2.5 h-2.5 text-white hidden peer-checked:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={4}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <span className="flex items-center gap-1">
            {maintainAspectRatio ? (
              <LinkIcon size={12} className="text-brand-blue" />
            ) : (
              <Link2Off size={12} className="text-zinc-500" />
            )}
            Maintain Aspect Ratio
          </span>
        </label>
        {isBulk && (
          <span className="text-[10px] text-zinc-500 italic">
            Applies aspect ratio relative to each image
          </span>
        )}
      </div>
    </div>
  );
};

export default ResizeInputs;
