"use client";

import React from "react";
import { Loader2, X } from "lucide-react";

interface LoadingOverlayProps {
  progress: number; // 0 to 100
  total: number;
  current: number;
  onCancel: () => void;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  progress,
  total,
  current,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-sidebar border border-border-custom rounded-xl p-6 max-w-sm w-full space-y-5 text-center shadow-2xl animate-fade-in">
        <div className="flex justify-center">
          <div className="relative flex items-center justify-center">
            <Loader2 size={48} className="text-brand-blue animate-spin" />
            <span className="absolute text-xs font-bold text-zinc-200">
              {progress}%
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white">Converting Images</h3>
          <p className="text-xs text-zinc-400">
            Processing image <strong className="text-zinc-200">{current}</strong> of{" "}
            <strong className="text-zinc-200">{total}</strong>...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-brand-blue h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 border border-border-custom bg-sidebar/55 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold px-4 py-2 rounded transition-all cursor-pointer"
          >
            <X size={12} />
            <span>Cancel Conversion</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
