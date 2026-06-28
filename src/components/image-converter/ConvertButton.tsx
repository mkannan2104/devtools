"use client";

import React from "react";
import { Play, RotateCcw, Loader2 } from "lucide-react";

interface ConvertButtonProps {
  onConvert: () => void;
  onReset: () => void;
  fileCount: number;
  isConverting: boolean;
}

export const ConvertButton: React.FC<ConvertButtonProps> = ({
  onConvert,
  onReset,
  fileCount,
  isConverting,
}) => {
  const isDisabled = fileCount === 0 || isConverting;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
      <button
        type="button"
        disabled={isDisabled}
        onClick={onConvert}
        className={`flex-1 flex items-center justify-center gap-2 rounded bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-semibold px-6 py-3 shadow transition-all duration-200 w-full sm:w-auto cursor-pointer disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500 disabled:border disabled:border-border-custom`}
      >
        {isConverting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Converting {fileCount > 1 ? `${fileCount} Images` : "Image"}...</span>
          </>
        ) : (
          <>
            <Play size={16} />
            <span>
              Convert {fileCount > 1 ? `${fileCount} Images` : fileCount === 1 ? "Image" : "Images"}
            </span>
          </>
        )}
      </button>

      {fileCount > 0 && (
        <button
          type="button"
          onClick={onReset}
          disabled={isConverting}
          className="flex items-center justify-center gap-2 border border-border-custom bg-sidebar text-zinc-300 hover:text-white text-sm font-semibold px-6 py-3 rounded transition-all duration-200 w-full sm:w-auto cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCcw size={15} />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
};

export default ConvertButton;
