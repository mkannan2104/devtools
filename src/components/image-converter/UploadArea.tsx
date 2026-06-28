"use client";

import React, { useRef, useState, useEffect } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles: number;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onFilesSelected, maxFiles }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const acceptedFormats = [
    ".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tiff", ".avif", ".heic", ".svg"
  ];
  const acceptString = acceptedFormats.join(",");

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const filesArray = Array.from(fileList);
    onFilesSelected(filesArray);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Clipboard Paste Support
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const pastedFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) pastedFiles.push(file);
        }
      }

      if (pastedFiles.length > 0) {
        onFilesSelected(pastedFiles);
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [onFilesSelected]);

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-all duration-200 cursor-pointer min-h-[220px] ${
        isDragActive
          ? "border-brand-blue bg-brand-blue/10 scale-[1.01]"
          : "border-border-custom bg-sidebar/30 hover:border-brand-blue/40 hover:bg-sidebar/50"
      }`}
      onClick={onButtonClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptString}
        onChange={handleChange}
        className="hidden"
      />

      <div className="rounded-full bg-zinc-800/80 p-4 text-zinc-400 group-hover:text-brand-blue mb-4 border border-border-custom">
        <Upload size={32} className={isDragActive ? "text-brand-blue animate-bounce" : "text-zinc-400"} />
      </div>

      <h3 className="text-base font-bold text-zinc-200 mb-1">
        Drag &amp; drop images here, or <span className="text-brand-blue hover:underline">browse</span>
      </h3>
      <p className="text-xs text-zinc-500 max-w-md leading-relaxed mb-2">
        Supports JPG, PNG, WEBP, AVIF, HEIC, SVG, GIF, BMP, TIFF.
      </p>
      <div className="inline-flex items-center gap-1 rounded bg-zinc-850 border border-border-custom/50 px-2 py-0.5 text-2xs font-semibold text-zinc-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        <span>Paste support: press Ctrl+V anywhere</span>
      </div>
      <p className="text-2xs text-zinc-600 mt-2">
        Max {maxFiles} images can be processed at a time.
      </p>
    </div>
  );
};

export default UploadArea;
