"use client";

import React from "react";
import { Sliders } from "lucide-react";

interface QualitySliderProps {
  value: number;
  onChange: (value: number) => void;
  format: string;
}

export const QualitySlider: React.FC<QualitySliderProps> = ({ value, onChange, format }) => {
  const supportsQuality = ["jpg", "webp", "avif"].includes(format);

  return (
    <div className={`space-y-2 transition-opacity duration-200 ${supportsQuality ? "opacity-100" : "opacity-50"}`}>
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
          Quality
        </label>
        <span className="text-xs font-bold text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-2 py-0.5 rounded">
          {supportsQuality ? `${value}%` : "N/A (Lossless)"}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Sliders size={14} className="text-zinc-500 shrink-0" />
        <input
          type="range"
          min="1"
          max="100"
          value={supportsQuality ? value : 100}
          disabled={!supportsQuality}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-blue disabled:cursor-not-allowed disabled:bg-zinc-900"
        />
      </div>
      <p className="text-[10px] text-zinc-500 italic leading-relaxed">
        {supportsQuality
          ? `Lower quality reduces file size; higher quality retains details. Recommended: 80%–90%.`
          : `${format.toUpperCase()} uses lossless compression. Quality setting is not applicable.`}
      </p>
    </div>
  );
};

export default QualitySlider;
