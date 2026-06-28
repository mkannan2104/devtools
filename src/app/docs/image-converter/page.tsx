import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Shield, HelpCircle, ArrowLeft, Check, ListCollapse, TableProperties } from "lucide-react";
import { createStaticPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createStaticPageMetadata({
  title: "Image Converter – Convert JPG, PNG, WEBP, AVIF Online Free",
  description:
    "Free online image converter. Convert JPG, PNG, WEBP, AVIF, BMP and more. Fast, secure, privacy-friendly and works directly in your browser.",
  path: "/docs/image-converter",
});

export default function ImageConverterDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Header and Back Link */}
      <div className="border-b border-border-custom pb-6 space-y-4">
        <Link
          href="/docs"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-all font-semibold"
        >
          <ArrowLeft size={14} />
          <span>Back to Documentation</span>
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2.5">
            <BookOpen className="text-brand-blue" size={32} aria-hidden="true" />
            Image Converter Documentation
          </h1>
          <p className="mt-2 text-zinc-400 text-sm">
            Learn how to use the client-side Image Converter, understand supported formats, and explore advanced settings.
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Shield className="text-emerald-500" size={20} aria-hidden="true" />
          Overview &amp; Privacy Assurance
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          The <strong>Image Converter</strong> is a professional utility that lets you convert, resize, and compress images directly in your browser. Unlike traditional online converters, it runs <strong>100% client-side</strong> using your browser&apos;s HTML5 Canvas, File APIs, and optimized client-side libraries.
        </p>
        <div className="p-4 rounded-lg bg-emerald-950/10 border border-emerald-950/45 text-xs text-zinc-350 leading-relaxed">
          <strong className="text-emerald-400 font-bold block mb-1">Privacy Notice:</strong>
          All image rendering, decoding, and processing are performed locally in your browser sandbox. None of your image files, metadata, or coordinates are ever uploaded, transmitted, or stored on any external servers. Your intellectual property and personal data remain completely secure.
        </div>
      </section>

      {/* Supported Formats Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <TableProperties className="text-brand-blue" size={20} aria-hidden="true" />
          Supported Formats Matrix
        </h2>
        <p className="text-sm text-zinc-450">
          We support a wide array of input formats and output extensions. Below is the conversion capabilities table:
        </p>
        <div className="overflow-x-auto rounded-lg border border-border-custom bg-sidebar/20">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border-custom bg-sidebar/50 text-zinc-300 font-semibold">
                <th className="p-3">Format</th>
                <th className="p-3">Input Support</th>
                <th className="p-3">Output Support</th>
                <th className="p-3">Behavior &amp; Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom/50 text-zinc-400">
              <tr>
                <td className="p-3 font-semibold text-zinc-200">JPG / JPEG</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Yes</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Yes</td>
                <td className="p-3">Standard photographic format. Supports lossy quality and custom DPI.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-200">PNG</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Yes</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Yes</td>
                <td className="p-3">Lossless compression with transparency support. Ideal for icons and text.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-200">WEBP</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Yes</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Yes</td>
                <td className="p-3">Modern Google standard. Supports both lossy and lossless modes with transparency.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-200">AVIF</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Yes</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Yes</td>
                <td className="p-3">Next-gen compression. Best size-to-quality ratio. Requires modern browser.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-200">HEIC</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Yes</td>
                <td className="p-3 text-zinc-500">No</td>
                <td className="p-3">Apple iOS photo format. Decoded dynamically client-side for format export.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-200">SVG</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Yes</td>
                <td className="p-3 text-zinc-500">No</td>
                <td className="p-3">Vector graphics. Rasterized to PNG, JPEG, or WEBP at custom dimensions.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-200">BMP / TIFF</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Yes</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Yes</td>
                <td className="p-3">Legacy bitmap/archive formats. Export depends on host browser canvas encoding.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-200">GIF</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Yes</td>
                <td className="p-3 text-zinc-500">No</td>
                <td className="p-3">Static frames are extracted and converted to standard formats.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ListCollapse className="text-brand-blue" size={20} aria-hidden="true" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
          <div className="p-4 rounded-lg bg-sidebar/50 border border-border-custom space-y-1">
            <h3 className="font-bold text-zinc-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
              Fast Browser Processing
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Processes conversions in milliseconds using local CPU/GPU canvas engines. Zero upload queues or network delays.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-sidebar/50 border border-border-custom space-y-1">
            <h3 className="font-bold text-zinc-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
              Custom Aspect Resizing
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Resize width and height in pixels. Maintain ratio automatically to prevent image distortion, or force stretch.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-sidebar/50 border border-border-custom space-y-1">
            <h3 className="font-bold text-zinc-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
              EXIF &amp; Metadata Control
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Remove camera parameters, GPS tags, and location data by default, or preserve them during JPEG re-compilations.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-sidebar/50 border border-border-custom space-y-1">
            <h3 className="font-bold text-zinc-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
              DPI and Chroma Subsampling
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Inject custom DPI values (72, 96, 150, 300) for print resolution, and configure subsampling (4:4:4, 4:2:0) for compression tuning.
            </p>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">How to Use</h2>
        <div className="space-y-2 text-xs md:text-sm text-zinc-350">
          <div className="flex gap-3 items-start">
            <div className="rounded-full bg-zinc-800 w-5 h-5 flex items-center justify-center font-bold text-zinc-300 text-xs shrink-0 mt-0.5">
              1
            </div>
            <p>
              <strong>Upload Images:</strong> Drag and drop your image files into the upload area, click browse to select them via files explorer, or press <code>Ctrl+V</code> anywhere on the page to paste from your clipboard.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="rounded-full bg-zinc-800 w-5 h-5 flex items-center justify-center font-bold text-zinc-300 text-xs shrink-0 mt-0.5">
              2
            </div>
            <p>
              <strong>Configure Settings:</strong> Select your desired output format and adjust the quality level (for lossy formats). Enter target dimensions if you wish to resize, keeping the aspect ratio intact.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="rounded-full bg-zinc-800 w-5 h-5 flex items-center justify-center font-bold text-zinc-300 text-xs shrink-0 mt-0.5">
              3
            </div>
            <p>
              <strong>Apply Advanced Options (Optional):</strong> Expand the Advanced Settings panel to change DPI, strip or preserve EXIF headers, set a background color for JPEG transparency, or toggle progressive scanning.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="rounded-full bg-zinc-800 w-5 h-5 flex items-center justify-center font-bold text-zinc-300 text-xs shrink-0 mt-0.5">
              4
            </div>
            <p>
              <strong>Convert and Download:</strong> Click the primary <em>Convert Images</em> button. Once complete, inspect size reduction metrics, download individual files, or click <em>Download All</em> for bulk batches.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="text-zinc-400" size={20} aria-hidden="true" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 text-xs md:text-sm text-zinc-400">
          <div className="space-y-1 bg-sidebar/25 border border-border-custom p-4 rounded">
            <h3 className="font-bold text-zinc-200">What is the best quality setting to reduce file size?</h3>
            <p className="leading-relaxed">
              We recommend using a quality of 80% to 85% for JPEG and WEBP conversions. This yields high compression ratios (decreasing file sizes significantly) while maintaining visual fidelity that is indistinguishable from the original to the human eye.
            </p>
          </div>
          <div className="space-y-1 bg-sidebar/25 border border-border-custom p-4 rounded">
            <h3 className="font-bold text-zinc-200">What happens when I convert transparent PNGs to JPG?</h3>
            <p className="leading-relaxed">
              The JPEG format does not support transparency. When converting a transparent PNG or WEBP to JPG, our canvas engine overlays the image onto a solid background color. You can customize this background color in Advanced Settings (defaults to white).
            </p>
          </div>
          <div className="space-y-1 bg-sidebar/25 border border-border-custom p-4 rounded">
            <h3 className="font-bold text-zinc-200">How many files can I process concurrently?</h3>
            <p className="leading-relaxed">
              You can process up to 10 files in a single batch. This queue limit is in place to prevent high memory consumption and browser tab crashes during massive image resizing operations.
            </p>
          </div>
          <div className="space-y-1 bg-sidebar/25 border border-border-custom p-4 rounded">
            <h3 className="font-bold text-zinc-200">Is my source image modified or overwritten?</h3>
            <p className="leading-relaxed">
              No. The tool processes a copy of the image inside memory. Your original local files remain completely untouched and unmodified.
            </p>
          </div>
        </div>
      </section>

      {/* Footer support email */}
      <div className="pt-6 border-t border-border-custom text-xs text-zinc-455 text-center">
        <p>
          Return to the{" "}
          <Link href="/image/converter" className="text-brand-blue hover:underline">
            Image Converter Tool
          </Link>
          {" or view "}
          <Link href="/docs" className="text-brand-blue hover:underline">
            Other Documentation
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
