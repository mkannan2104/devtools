"use client";

import React from "react";
import { X, FileImage, Settings, HelpCircle } from "lucide-react";

interface FileItem {
  id: string;
  file: File;
  previewUrl: string;
  originalWidth?: number;
  originalHeight?: number;
  originalSize: number;
  name: string;
  outputName: string;
  status: 'pending' | 'converting' | 'done' | 'failed';
  error?: string;
}

interface ImagePreviewProps {
  files: FileItem[];
  onRemove: (id: string) => void;
  onRename: (id: string, newName: string) => void;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const ImagePreview: React.FC<ImagePreviewProps> = ({ files, onRemove, onRename }) => {
  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-border-custom pb-2">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Uploaded Images ({files.length}/10)
        </h4>
      </div>

      <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-1">
        {files.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg border border-border-custom bg-sidebar/20 hover:bg-sidebar/40 transition-all"
          >
            <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
              {/* Thumbnail Container */}
              <div className="relative shrink-0 w-12 h-12 rounded border border-border-custom bg-zinc-900 overflow-hidden flex items-center justify-center">
                {item.previewUrl ? (
                  <img
                    src={item.previewUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FileImage size={20} className="text-zinc-500" />
                )}
              </div>

              {/* File Info */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.outputName}
                    onChange={(e) => onRename(item.id, e.target.value)}
                    className="bg-transparent text-sm font-bold text-zinc-200 border-b border-transparent hover:border-zinc-650 focus:border-brand-blue focus:outline-none w-full max-w-[240px] px-0.5 truncate"
                    title="Click to rename output file"
                    placeholder="Output Filename"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-zinc-500">
                  <span>{formatBytes(item.originalSize)}</span>
                  {item.originalWidth && item.originalHeight && (
                    <>
                      <span className="text-zinc-700 font-bold">•</span>
                      <span>
                        {item.originalWidth} × {item.originalHeight} px
                      </span>
                    </>
                  )}
                  {item.file.name.toLowerCase().endsWith(".heic") && (
                    <>
                      <span className="text-zinc-700 font-bold">•</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-brand-blue/15 text-brand-blue border border-brand-blue/20">
                        HEIC
                      </span>
                    </>
                  )}
                  {item.file.name.toLowerCase().endsWith(".svg") && (
                    <>
                      <span className="text-zinc-700 font-bold">•</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-500 border border-amber-500/20">
                        SVG
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t border-border-custom/50 pt-2 sm:border-t-0 sm:pt-0 shrink-0">
              {item.status === 'pending' && (
                <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-400 bg-zinc-800 border border-border-custom px-2 py-0.5 rounded">
                  Pending
                </span>
              )}
              {item.status === 'converting' && (
                <span className="text-[10px] font-bold uppercase tracking-wide text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-2 py-0.5 rounded animate-pulse">
                  Converting...
                </span>
              )}
              {item.status === 'done' && (
                <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-400 bg-emerald-950/20 border border-emerald-950/45 px-2 py-0.5 rounded">
                  Ready
                </span>
              )}
              {item.status === 'failed' && (
                <span
                  className="text-[10px] font-bold uppercase tracking-wide text-rose-400 bg-rose-950/20 border border-rose-950/45 px-2 py-0.5 rounded"
                  title={item.error}
                >
                  Error
                </span>
              )}
              <button
                onClick={() => onRemove(item.id)}
                className="rounded-md p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-950/10 transition-colors"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;
