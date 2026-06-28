"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolGuide from "@/components/tools/ToolGuide";
import ToolSchema from "@/components/tools/ToolSchema";
import ToolExamples, { ToolExample } from "@/components/tools/ToolExamples";
import ToolFAQ, { FAQItem } from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";

import UploadArea from "@/components/image-converter/UploadArea";
import ImagePreview from "@/components/image-converter/ImagePreview";
import FormatSelector from "@/components/image-converter/FormatSelector";
import QualitySlider from "@/components/image-converter/QualitySlider";
import ResizeInputs from "@/components/image-converter/ResizeInputs";
import AdvancedSettings, { AdvancedOptions } from "@/components/image-converter/AdvancedSettings";
import ConvertButton from "@/components/image-converter/ConvertButton";
import DownloadCard, { ConvertedItem } from "@/components/image-converter/DownloadCard";
import LoadingOverlay from "@/components/image-converter/LoadingOverlay";
import ErrorBanner from "@/components/image-converter/ErrorBanner";

import { getImageDimensions, setJpegDpi, copyJpegExif } from "@/lib/image/utils";

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

const EXAMPLES: ToolExample[] = [
  {
    title: "Web Optimization (WebP)",
    description: "Convert heavy PNGs or HEIC camera shots into lightweight, modern WEBP format at 80% quality.",
    content: "CONFIG: format=webp, quality=80, resizeWidth=, resizeHeight=, keepExif=false, dpi=72"
  },
  {
    title: "Rasterize SVG at High Resolution",
    description: "Rasterize vector SVG files into high-density 300 DPI PNGs at 2000px width for print.",
    content: "CONFIG: format=png, quality=100, resizeWidth=2000, resizeHeight=, keepExif=false, dpi=300"
  },
  {
    title: "JPG Compression with EXIF",
    description: "Convert images to JPG while maintaining EXIF metadata tags and setting background fill.",
    content: "CONFIG: format=jpg, quality=85, resizeWidth=, resizeHeight=, keepExif=true, dpi=150, backgroundColor=#ffffff"
  }
];

const FAQS: FAQItem[] = [
  {
    question: "What is the best format and quality for web images?",
    answer: "WebP and AVIF offer the best compression-to-quality ratio. A quality setting between 80% and 85% is typically the sweet spot, providing significant file size reductions (up to 70-80%) with virtually no human-perceptible loss in visual clarity."
  },
  {
    question: "Will image transparency be preserved during conversion?",
    answer: "Transparency is fully preserved when converting to PNG, WEBP, or AVIF formats. If you convert transparent images to JPG (which does not support transparency), the transparent pixels will be filled with your selected background color in Advanced Settings (defaults to white)."
  },
  {
    question: "Are my images uploaded to any server for processing?",
    answer: "No. All conversion, resizing, and optimizations are performed entirely inside your browser's sandboxed memory using Canvas and WebAssembly. Your images never leave your local device, making this tool completely secure for corporate and sensitive data."
  },
  {
    question: "How does the HEIC converter work on Windows/Android?",
    answer: "Apple's HEIC photos are decoded in-browser using a dynamically loaded client-side parser. This allows Windows, Linux, and Android users to convert iPhone photos directly without needing macOS or external cloud upload tools."
  }
];

export const ImageConverterClient: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [format, setFormat] = useState<string>("jpg");
  const [quality, setQuality] = useState<number>(85);
  const [resizeWidth, setResizeWidth] = useState<string>("");
  const [resizeHeight, setResizeHeight] = useState<string>("");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  
  const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptions>({
    compressionType: "lossy",
    keepExif: false,
    dpi: 72,
    colorProfile: "remove",
    progressive: false,
    chromaSubsampling: "auto",
    backgroundColor: "#ffffff",
    autoRotate: true,
    stripIcc: true,
  });

  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentConvertingIndex, setCurrentConvertingIndex] = useState<number>(0);
  const [convertedItems, setConvertedItems] = useState<ConvertedItem[]>([]);
  const [error, setError] = useState<string>("");

  const abortControllerRef = useRef<boolean>(false);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.previewUrl && !f.previewUrl.startsWith("data:")) {
          URL.revokeObjectURL(f.previewUrl);
        }
      });
      convertedItems.forEach((c) => {
        URL.revokeObjectURL(c.convertedUrl);
      });
    };
  }, []);

  const handleFilesSelected = async (newFiles: File[]) => {
    setError("");

    if (files.length + newFiles.length > 10) {
      setError("Maximum of 10 images can be processed at a time.");
      return;
    }

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];
    const allowedExtensions = ["jpg", "jpeg", "png", "webp", "gif", "bmp", "tiff", "avif", "heic", "svg"];

    newFiles.forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      if (allowedExtensions.includes(ext) || file.type.startsWith("image/")) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      setError(`Unsupported format or corrupted files: ${invalidFiles.join(", ")}`);
    }

    if (validFiles.length === 0) return;

    const newItems: FileItem[] = validFiles.map((file) => {
      const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
      return {
        id: Math.random().toString(36).substring(7),
        file,
        previewUrl: "",
        originalSize: file.size,
        name: file.name,
        outputName: baseName,
        status: "pending",
      };
    });

    setFiles((prev) => [...prev, ...newItems]);

    // Load previews and sizes asynchronously
    for (const item of newItems) {
      try {
        const ext = item.file.name.split(".").pop()?.toLowerCase() || "";
        let previewUrl = "";
        let width: number | undefined;
        let height: number | undefined;

        if (ext === "heic" || item.file.type === "image/heic") {
          const heic2any = (await import("heic2any")).default;
          const conversionResult = await heic2any({ blob: item.file, toType: "image/jpeg" });
          const jpegBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
          previewUrl = URL.createObjectURL(jpegBlob);
          const dims = await getImageDimensions(previewUrl);
          width = dims.width;
          height = dims.height;
        } else if (ext === "svg" || item.file.type === "image/svg+xml") {
          const text = await item.file.text();
          previewUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(text);
          const dims = await getImageDimensions(previewUrl);
          width = dims.width;
          height = dims.height;
        } else {
          previewUrl = URL.createObjectURL(item.file);
          const dims = await getImageDimensions(previewUrl);
          width = dims.width;
          height = dims.height;
        }

        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? {
                  ...f,
                  previewUrl,
                  originalWidth: width,
                  originalHeight: height,
                }
              : f
          )
        );
      } catch (err) {
        console.error("Failed to load image metadata:", err);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? {
                  ...f,
                  status: "failed",
                  error: "Corrupted image or loading failed",
                }
              : f
          )
        );
      }
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target && target.previewUrl && !target.previewUrl.startsWith("data:")) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleRenameFile = (id: string, newName: string) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, outputName: newName } : f)));
  };

  const handleReset = () => {
    files.forEach((f) => {
      if (f.previewUrl && !f.previewUrl.startsWith("data:")) {
        URL.revokeObjectURL(f.previewUrl);
      }
    });
    convertedItems.forEach((c) => {
      URL.revokeObjectURL(c.convertedUrl);
    });
    setFiles([]);
    setConvertedItems([]);
    setError("");
  };

  const handleCancelConversion = () => {
    abortControllerRef.current = true;
    setIsConverting(false);
  };

  const handleConvert = async () => {
    setIsConverting(true);
    abortControllerRef.current = false;
    setProgress(0);
    setError("");

    const activeFiles = files.filter((f) => f.status !== "failed");
    if (activeFiles.length === 0) {
      setIsConverting(false);
      return;
    }

    const results: ConvertedItem[] = [];
    let convertedCount = 0;

    for (const item of activeFiles) {
      if (abortControllerRef.current) break;

      convertedCount++;
      setCurrentConvertingIndex(convertedCount);
      setProgress(Math.round(((convertedCount - 1) / activeFiles.length) * 100));

      setFiles((prev) => prev.map((f) => (f.id === item.id ? { ...f, status: "converting" } : f)));

      try {
        const srcUrl = item.previewUrl || URL.createObjectURL(item.file);
        const img = new Image();
        img.src = srcUrl;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        const origW = item.originalWidth || img.naturalWidth;
        const origH = item.originalHeight || img.naturalHeight;
        let targetW = origW;
        let targetH = origH;

        const rw = parseInt(resizeWidth, 10);
        const rh = parseInt(resizeHeight, 10);

        if (rw > 0 && rh > 0) {
          targetW = rw;
          targetH = rh;
        } else if (rw > 0) {
          targetW = rw;
          if (maintainAspectRatio) {
            targetH = Math.round((rw / origW) * origH);
          }
        } else if (rh > 0) {
          targetH = rh;
          if (maintainAspectRatio) {
            targetW = Math.round((rh / origH) * origW);
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not initialize canvas context");

        if (format === "jpg") {
          ctx.fillStyle = advancedOptions.backgroundColor || "#ffffff";
          ctx.fillRect(0, 0, targetW, targetH);
        }

        ctx.drawImage(img, 0, 0, targetW, targetH);

        let mimeType = `image/${format}`;
        if (format === "jpg") mimeType = "image/jpeg";

        const q = ["jpg", "webp", "avif"].includes(format) ? quality / 100 : 1.0;

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => {
              if (b) resolve(b);
              else reject(new Error("Image data rasterization returned empty result."));
            },
            mimeType,
            q
          );
        });

        let finalBlob = blob;

        if (format === "jpg") {
          let arrayBuffer = await blob.arrayBuffer();

          if (advancedOptions.dpi) {
            arrayBuffer = setJpegDpi(arrayBuffer, advancedOptions.dpi);
          }

          if (advancedOptions.keepExif) {
            const originalBuffer = await item.file.arrayBuffer();
            arrayBuffer = copyJpegExif(originalBuffer, arrayBuffer);
          }

          finalBlob = new Blob([arrayBuffer], { type: "image/jpeg" });
        }

        const convertedUrl = URL.createObjectURL(finalBlob);

        results.push({
          id: item.id,
          name: item.name,
          outputName: item.outputName,
          format,
          originalSize: item.originalSize,
          convertedSize: finalBlob.size,
          originalWidth: origW,
          originalHeight: origH,
          convertedWidth: targetW,
          convertedHeight: targetH,
          convertedUrl,
          convertedBlob: finalBlob,
        });

        setFiles((prev) => prev.map((f) => (f.id === item.id ? { ...f, status: "done" } : f)));
      } catch (err) {
        console.error(`Conversion failed for ${item.name}:`, err);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? {
                  ...f,
                  status: "failed",
                  error: err instanceof Error ? err.message : "Conversion failed",
                }
              : f
          )
        );
      }

      setProgress(Math.round((convertedCount / activeFiles.length) * 100));
    }

    if (!abortControllerRef.current) {
      setConvertedItems(results);
    }
    setIsConverting(false);
  };

  const handleSelectExample = (content: string) => {
    if (content.startsWith("CONFIG:")) {
      const params = content.replace("CONFIG:", "").trim().split(",");
      const config: Record<string, string> = {};
      params.forEach((param) => {
        const [k, v] = param.split("=");
        if (k && v !== undefined) config[k.trim()] = v.trim();
      });

      if (config.format) setFormat(config.format);
      if (config.quality) setQuality(parseInt(config.quality, 10));
      if (config.resizeWidth !== undefined) setResizeWidth(config.resizeWidth);
      if (config.resizeHeight !== undefined) setResizeHeight(config.resizeHeight);
      
      const newAdv = { ...advancedOptions };
      if (config.keepExif !== undefined) newAdv.keepExif = config.keepExif === "true";
      if (config.dpi) newAdv.dpi = parseInt(config.dpi, 10);
      if (config.backgroundColor) newAdv.backgroundColor = config.backgroundColor;
      setAdvancedOptions(newAdv);
    }
  };

  return (
    <div className="space-y-6">
      <ToolHeader
        title="Image Converter Online"
        category="Image"
        description="Convert JPEG, PNG, WEBP, AVIF, HEIC, and SVG images natively in your browser. Resize dimensions, adjust compression quality, preserve EXIF headers, and strip profiles entirely client-side."
        iconName="Image"
        externalUrl="https://w3c.github.io/png/"
        externalUrlLabel="W3C Image Format Specifications"
      />
      <ToolSchema toolId="image-converter" />
      <ToolGuide toolId="image-converter" />

      {error && <ErrorBanner message={error} onClear={() => setError("")} />}

      {convertedItems.length === 0 ? (
        <div className="space-y-6">
          {/* Main workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload & Queue Column */}
            <div className="lg:col-span-2 space-y-6">
              <UploadArea onFilesSelected={handleFilesSelected} maxFiles={10} />
              <ImagePreview
                files={files}
                onRemove={handleRemoveFile}
                onRename={handleRenameFile}
              />
              <div className="pt-4 border-t border-border-custom/50">
                <ConvertButton
                  onConvert={handleConvert}
                  onReset={handleReset}
                  fileCount={files.length}
                  isConverting={isConverting}
                />
              </div>
            </div>

            {/* Settings Column */}
            <div className="space-y-4 rounded-xl border border-border-custom bg-sidebar/40 p-5 shadow-md h-fit">
              <h3 className="text-sm font-bold text-zinc-200 border-b border-border-custom pb-3 mb-2">
                Output Options
              </h3>

              <FormatSelector value={format} onChange={setFormat} />

              <QualitySlider value={quality} onChange={setQuality} format={format} />

              <ResizeInputs
                width={resizeWidth}
                height={resizeHeight}
                maintainAspectRatio={maintainAspectRatio}
                onWidthChange={setResizeWidth}
                onHeightChange={setResizeHeight}
                onMaintainAspectRatioChange={setMaintainAspectRatio}
                isBulk={files.length > 1}
              />

              <AdvancedSettings
                options={advancedOptions}
                onChange={setAdvancedOptions}
                format={format}
              />
            </div>
          </div>
        </div>
      ) : (
        <DownloadCard items={convertedItems} onConvertAnother={handleReset} />
      )}

      {isConverting && (
        <LoadingOverlay
          progress={progress}
          total={files.filter((f) => f.status !== "failed").length}
          current={currentConvertingIndex}
          onCancel={handleCancelConversion}
        />
      )}

      <ToolExamples examples={EXAMPLES} onSelect={handleSelectExample} />
      <ToolFAQ faqs={FAQS} toolName="Image Converter" />
      <RelatedTools currentToolId="image-converter" category="Image" />
    </div>
  );
};

export default ImageConverterClient;
