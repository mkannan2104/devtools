"use client";

import React from "react";
import { AlertCircle, X } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onClear: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onClear }) => {
  if (!message) return null;

  return (
    <div className="rounded-lg border border-rose-950/45 bg-rose-950/10 p-4 shadow-md flex items-start justify-between gap-3 text-rose-400">
      <div className="flex items-start gap-2.5 text-xs md:text-sm">
        <AlertCircle size={16} className="shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h4 className="font-bold text-zinc-200">Processing Error</h4>
          <p className="text-zinc-400 text-xs leading-relaxed">{message}</p>
        </div>
      </div>
      <button
        onClick={onClear}
        className="rounded-md p-1 hover:bg-rose-950/20 text-rose-400/70 hover:text-rose-400 transition-colors shrink-0"
        aria-label="Dismiss error"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default ErrorBanner;
