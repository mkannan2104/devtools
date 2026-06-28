"use client";

import React from "react";
import { Image } from "lucide-react";

interface FormatSelectorProps {
  value: string;
  onChange: (format: string) => void;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({ value, onChange }) => {
  const formats = [
    { value: "jpg", label: "JPG (Joint Photographic Group)" },
    { value: "png", label: "PNG (Portable Network Graphics)" },
    { value: "webp", label: "WEBP (Google Web Picture)" },
    { value: "avif", label: "AVIF (AV1 Image File Format)" },
    { value: "bmp", label: "BMP (Windows Bitmap)" },
    { value: "tiff", label: "TIFF (Tagged Image File Format)" },
  ];

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
        Output Format
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500 pointer-events-none">
          <Image size={14} />
        </span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded border border-border-custom bg-background py-2 pl-9 pr-10 text-sm text-zinc-200 focus:border-brand-blue focus:outline-none transition-colors cursor-pointer"
        >
          {formats.map((fmt) => (
            <option key={fmt.value} value={fmt.value}>
              {fmt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormatSelector;
