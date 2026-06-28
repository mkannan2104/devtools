"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Sliders, Info } from "lucide-react";

export interface AdvancedOptions {
  compressionType: "lossy" | "lossless";
  keepExif: boolean;
  dpi: number;
  colorProfile: "keep" | "srgb" | "remove";
  progressive: boolean;
  chromaSubsampling: "auto" | "444" | "422" | "420";
  backgroundColor: string;
  autoRotate: boolean;
  stripIcc: boolean;
}

interface AdvancedSettingsProps {
  options: AdvancedOptions;
  onChange: (options: AdvancedOptions) => void;
  format: string;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  options,
  onChange,
  format,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const updateOption = <K extends keyof AdvancedOptions>(key: K, value: AdvancedOptions[K]) => {
    onChange({
      ...options,
      [key]: value,
    });
  };

  const isJpg = format === "jpg";
  const isLossySupported = ["jpg", "webp", "avif"].includes(format);

  return (
    <div className="rounded-lg border border-border-custom bg-sidebar/20 overflow-hidden transition-all duration-200">
      {/* Header Button */}
      <button
        type="button"
        onClick={toggleOpen}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-zinc-300 hover:text-white transition-all bg-sidebar/30"
      >
        <div className="flex items-center gap-2">
          <Sliders size={16} className="text-brand-blue" />
          <span>Advanced Settings</span>
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-350 ease-in-out ${
          isOpen ? "max-h-[800px] border-t border-border-custom p-5" : "max-h-0 opacity-0 pointer-events-none"
        } overflow-y-auto`}
      >
        <div className="grid grid-cols-1 gap-4 text-xs text-zinc-400">
          {/* Metadata EXIF */}
          <div className="space-y-1.5">
            <label className="text-2xs font-semibold text-zinc-500 uppercase tracking-wider block">
              Metadata (EXIF)
            </label>
            <select
              value={options.keepExif ? "keep" : "remove"}
              onChange={(e) => updateOption("keepExif", e.target.value === "keep")}
              className="w-full rounded border border-border-custom bg-background py-2 pl-3 pr-10 text-sm text-zinc-200 focus:border-brand-blue focus:outline-none cursor-pointer"
            >
              <option value="remove">Remove EXIF Metadata (Default - Privacy First)</option>
              <option value="keep">Keep EXIF Metadata (GPS, Camera Model, etc.)</option>
            </select>
          </div>

          {/* DPI Resolution */}
          <div className="space-y-1.5">
            <label className="text-2xs font-semibold text-zinc-500 uppercase tracking-wider block">
              Output Resolution (DPI)
            </label>
            <select
              value={options.dpi}
              onChange={(e) => updateOption("dpi", parseInt(e.target.value, 10))}
              className="w-full rounded border border-border-custom bg-background py-2 pl-3 pr-10 text-sm text-zinc-200 focus:border-brand-blue focus:outline-none cursor-pointer"
            >
              <option value={72}>72 DPI (Standard Web Screens)</option>
              <option value={96}>96 DPI (High Density Screens)</option>
              <option value={150}>150 DPI (Medium Quality Print)</option>
              <option value={300}>300 DPI (High Quality/Archive Print)</option>
            </select>
          </div>

          {/* Color Profile */}
          <div className="space-y-1.5">
            <label className="text-2xs font-semibold text-zinc-500 uppercase tracking-wider block">
              ICC Color Profile
            </label>
            <select
              value={options.colorProfile}
              onChange={(e) =>
                updateOption("colorProfile", e.target.value as AdvancedOptions["colorProfile"])
              }
              className="w-full rounded border border-border-custom bg-background py-2 pl-3 pr-10 text-sm text-zinc-200 focus:border-brand-blue focus:outline-none cursor-pointer"
            >
              <option value="remove">Remove Profile (Smaller file size)</option>
              <option value="srgb">Convert to sRGB (Web Standard)</option>
              <option value="keep">Preserve Original Profile</option>
            </select>
          </div>

          {/* Background Color (For Transparent to JPG) */}
          <div className={`space-y-1.5 transition-opacity ${isJpg ? "opacity-100" : "opacity-40"}`}>
            <label className="text-2xs font-semibold text-zinc-500 uppercase tracking-wider block">
              Transparent Background Fill
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={options.backgroundColor}
                disabled={!isJpg}
                onChange={(e) => updateOption("backgroundColor", e.target.value)}
                className="w-10 h-10 rounded border border-border-custom bg-background p-0.5 cursor-pointer disabled:cursor-not-allowed"
                title="Select background fill color"
              />
              <input
                type="text"
                value={options.backgroundColor}
                disabled={!isJpg}
                onChange={(e) => updateOption("backgroundColor", e.target.value)}
                placeholder="#ffffff"
                className="w-full rounded border border-border-custom bg-background py-2 px-3 text-sm text-zinc-200 focus:border-brand-blue focus:outline-none disabled:cursor-not-allowed h-10"
              />
            </div>
            <p className="text-[10px] text-zinc-500 italic">
              Used when converting transparent images (PNG/WEBP) to JPG.
            </p>
          </div>

          {/* Compression Type (If Lossless/Lossy supported) */}
          {isLossySupported && (
            <div className="space-y-1.5">
              <label className="text-2xs font-semibold text-zinc-500 uppercase tracking-wider block">
                Compression Type
              </label>
              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="compressionType"
                    checked={options.compressionType === "lossy"}
                    onChange={() => updateOption("compressionType", "lossy")}
                    className="text-brand-blue bg-background border-border-custom focus:ring-0"
                  />
                  <span>Lossy (Smaller size)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="compressionType"
                    checked={options.compressionType === "lossless"}
                    onChange={() => updateOption("compressionType", "lossless")}
                    className="text-brand-blue bg-background border-border-custom focus:ring-0"
                  />
                  <span>Lossless (Perfect Quality)</span>
                </label>
              </div>
            </div>
          )}

          {/* Chroma Subsampling */}
          {isJpg && (
            <div className="space-y-1.5">
              <label className="text-2xs font-semibold text-zinc-500 uppercase tracking-wider block">
                Chroma Subsampling
              </label>
              <select
                value={options.chromaSubsampling}
                onChange={(e) =>
                  updateOption(
                    "chromaSubsampling",
                    e.target.value as AdvancedOptions["chromaSubsampling"]
                  )
                }
                className="w-full rounded border border-border-custom bg-background py-2 pl-3 pr-10 text-sm text-zinc-200 focus:border-brand-blue focus:outline-none cursor-pointer"
              >
                <option value="auto">Auto (Recommended)</option>
                <option value="444">4:4:4 (No subsampling - Crisp text &amp; edges)</option>
                <option value="422">4:2:2 (Medium compression)</option>
                <option value="420">4:2:0 (Standard - High compression)</option>
              </select>
            </div>
          )}

          {/* Toggles Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border-custom/50 mt-2">
            {/* Progressive JPEG */}
            {isJpg && (
              <label className="flex items-start gap-2.5 text-xs text-zinc-400 hover:text-white cursor-pointer select-none">
                <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={options.progressive}
                    onChange={(e) => updateOption("progressive", e.target.checked)}
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
                <span className="flex flex-col">
                  <span>Progressive JPEG</span>
                  <span className="text-[10px] text-zinc-500 font-normal">Loads overlay scans</span>
                </span>
              </label>
            )}

            {/* Strip ICC Profile */}
            <label className="flex items-start gap-2.5 text-xs text-zinc-400 hover:text-white cursor-pointer select-none">
              <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={options.stripIcc}
                  onChange={(e) => updateOption("stripIcc", e.target.checked)}
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
              <span className="flex flex-col">
                <span>Strip ICC Profile</span>
                <span className="text-[10px] text-zinc-500 font-normal">Saves bytes on ICC data</span>
              </span>
            </label>

            {/* Auto Rotate */}
            <label className="flex items-start gap-2.5 text-xs text-zinc-400 hover:text-white cursor-pointer select-none">
              <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={options.autoRotate}
                  onChange={(e) => updateOption("autoRotate", e.target.checked)}
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
              <span className="flex flex-col">
                <span>Auto-Rotate</span>
                <span className="text-[10px] text-zinc-500 font-normal">Orientation from EXIF</span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;
