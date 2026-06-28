"use client";

import React from "react";
import { Download, RefreshCw, FileCheck, ArrowRight, ExternalLink } from "lucide-react";

export interface ConvertedItem {
  id: string;
  name: string;
  outputName: string;
  format: string;
  originalSize: number;
  convertedSize: number;
  originalWidth?: number;
  originalHeight?: number;
  convertedWidth?: number;
  convertedHeight?: number;
  convertedUrl: string;
  convertedBlob: Blob;
}

interface DownloadCardProps {
  items: ConvertedItem[];
  onConvertAnother: () => void;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const DownloadCard: React.FC<DownloadCardProps> = ({ items, onConvertAnother }) => {
  if (items.length === 0) return null;

  // Calculate stats
  const totalOriginalSize = items.reduce((acc, item) => acc + item.originalSize, 0);
  const totalConvertedSize = items.reduce((acc, item) => acc + item.convertedSize, 0);
  const bytesSaved = totalOriginalSize - totalConvertedSize;
  const sizeReductionPercent = totalOriginalSize > 0 ? (bytesSaved / totalOriginalSize) * 100 : 0;

  const handleDownloadSingle = (item: ConvertedItem) => {
    const link = document.createElement("a");
    link.href = item.convertedUrl;
    link.download = `${item.outputName}.${item.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    // Sequentially trigger downloads for all converted files
    items.forEach((item, index) => {
      setTimeout(() => {
        handleDownloadSingle(item);
      }, index * 200); // Stagger downloads slightly to prevent browser blocking
    });
  };

  return (
    <div className="space-y-6">
      {/* Conversion Summary Banner */}
      <div className="rounded-xl border border-emerald-950/45 bg-emerald-950/10 p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-emerald-950/40 p-3 text-emerald-400 border border-emerald-900/50 shrink-0">
            <FileCheck size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-zinc-100">
              Conversion Completed successfully!
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Processed {items.length} {items.length > 1 ? "images" : "image"}.
              {bytesSaved > 0 ? (
                <span>
                  {" "}
                  Saved <strong className="text-emerald-400">{formatBytes(bytesSaved)}</strong> (
                  <strong className="text-emerald-400">
                    {sizeReductionPercent.toFixed(1)}% size reduction
                  </strong>
                  )
                </span>
              ) : (
                <span> Format conversion complete. No file size savings.</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
          {items.length > 1 && (
            <button
              onClick={handleDownloadAll}
              className="flex items-center justify-center gap-2 rounded bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold px-4 py-2 w-full md:w-auto cursor-pointer"
            >
              <Download size={14} />
              Download All ({items.length})
            </button>
          )}
          <button
            onClick={onConvertAnother}
            className="flex items-center justify-center gap-2 rounded border border-border-custom bg-sidebar text-zinc-300 hover:text-white text-xs font-semibold px-4 py-2 w-full md:w-auto cursor-pointer"
          >
            <RefreshCw size={12} />
            Convert Another
          </button>
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const fileSavedBytes = item.originalSize - item.convertedSize;
          const pct = item.originalSize > 0 ? (fileSavedBytes / item.originalSize) * 100 : 0;
          const isCompressed = fileSavedBytes > 0;

          return (
            <div
              key={item.id}
              className="rounded-lg border border-border-custom bg-sidebar/30 p-4 flex flex-col justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                {/* Preview image */}
                <div className="relative shrink-0 w-16 h-16 rounded border border-border-custom bg-zinc-900 overflow-hidden group flex items-center justify-center">
                  <img
                    src={item.convertedUrl}
                    alt={item.outputName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <a
                    href={item.convertedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                    title="View Full Resolution"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

                {/* Details list */}
                <div className="min-w-0 flex-1 space-y-1 text-xs">
                  <h4 className="font-bold text-zinc-200 truncate flex items-center gap-1.5" title={`${item.outputName}.${item.format}`}>
                    {item.outputName}
                    <span className="text-[10px] font-mono font-normal text-zinc-500 uppercase">
                      .{item.format}
                    </span>
                  </h4>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-zinc-400 font-medium">
                    <div>Original Size:</div>
                    <div className="text-zinc-500 font-mono">{formatBytes(item.originalSize)}</div>
                    <div>New Size:</div>
                    <div className="text-zinc-200 font-bold font-mono">
                      {formatBytes(item.convertedSize)}
                    </div>
                    {item.convertedWidth && item.convertedHeight && (
                      <>
                        <div>Resolution:</div>
                        <div className="text-zinc-400">
                          {item.convertedWidth} × {item.convertedHeight} px
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom bar with action and savings */}
              <div className="flex items-center justify-between pt-3 border-t border-border-custom/50">
                <div>
                  {isCompressed ? (
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/15 border border-emerald-950/40 px-2 py-0.5 rounded">
                      -{pct.toFixed(0)}% Saved
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-zinc-400 bg-zinc-800 border border-border-custom px-2 py-0.5 rounded">
                      +{(Math.abs(pct)).toFixed(0)}% (Unchanged)
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleDownloadSingle(item)}
                  className="flex items-center gap-1.5 rounded bg-zinc-800 hover:bg-zinc-700 hover:text-white border border-border-custom text-zinc-300 text-xs font-semibold px-3 py-1.5 cursor-pointer transition-colors"
                >
                  <Download size={12} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DownloadCard;
