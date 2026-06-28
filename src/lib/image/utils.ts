/**
 * Client-side Image Processing Utilities for the Image Converter Tool.
 * Performs actions like EXIF metadata preservation, DPI setting, and scaling.
 */

export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Loads an image from a URL and returns its natural dimensions.
 */
export const getImageDimensions = (url: string): Promise<ImageDimensions> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = (err) => reject(err);
    img.src = url;
  });
};

/**
 * Parses JPEG byte stream to update DPI resolution density in APP0 JFIF header.
 */
export const setJpegDpi = (buffer: ArrayBuffer, dpi: number): ArrayBuffer => {
  const view = new DataView(buffer);
  
  // SOI marker check (FF D8)
  if (view.byteLength < 4 || view.getUint16(0) !== 0xffd8) {
    return buffer;
  }

  let offset = 2;
  while (offset < view.byteLength - 4) {
    const marker = view.getUint16(offset);
    
    if (marker === 0xffe0) {
      // APP0 marker found. Check for JFIF identifier.
      if (
        view.getUint8(offset + 4) === 0x4a && // J
        view.getUint8(offset + 5) === 0x46 && // F
        view.getUint8(offset + 6) === 0x49 && // I
        view.getUint8(offset + 7) === 0x46 && // F
        view.getUint8(offset + 8) === 0x00    // \0
      ) {
        // Offset + 11 is Units: 1 = dots per inch (DPI)
        view.setUint8(offset + 11, 1);
        
        // Offset + 12 (2 bytes) is X Density
        view.setUint16(offset + 12, dpi);
        
        // Offset + 14 (2 bytes) is Y Density
        view.setUint16(offset + 14, dpi);
        break;
      }
    }

    if (marker >= 0xffd0 && marker <= 0xffd9) {
      offset += 2;
    } else {
      const length = view.getUint16(offset + 2);
      offset += 2 + length;
    }
  }

  return buffer;
};

/**
 * Extracts the APP1 EXIF metadata block from an original JPEG buffer
 * and stitches it into the converted JPEG buffer.
 */
export const copyJpegExif = (original: ArrayBuffer, converted: ArrayBuffer): ArrayBuffer => {
  const origView = new DataView(original);
  const convView = new DataView(converted);

  // Check SOI (FF D8) on both
  if (
    original.byteLength < 4 ||
    converted.byteLength < 4 ||
    origView.getUint16(0) !== 0xffd8 ||
    convView.getUint16(0) !== 0xffd8
  ) {
    return converted;
  }

  // Find APP1 (EXIF) segment in original JPEG
  let origOffset = 2;
  let exifSegment: ArrayBuffer | null = null;

  while (origOffset < origView.byteLength - 4) {
    const marker = origView.getUint16(origOffset);
    
    if (marker === 0xffe1) {
      // APP1 segment found!
      const length = origView.getUint16(origOffset + 2);
      exifSegment = original.slice(origOffset, origOffset + 2 + length);
      break;
    }

    if (marker >= 0xffd0 && marker <= 0xffd9) {
      origOffset += 2;
    } else {
      const length = origView.getUint16(origOffset + 2);
      origOffset += 2 + length;
    }
  }

  if (!exifSegment) {
    return converted; // No EXIF metadata block to transfer
  }

  // We insert the EXIF segment right after the SOI marker (offset 2) of the converted JPEG.
  const result = new Uint8Array(converted.byteLength + exifSegment.byteLength);
  result.set(new Uint8Array(converted.slice(0, 2)), 0); // SOI
  result.set(new Uint8Array(exifSegment), 2); // EXIF APP1
  result.set(new Uint8Array(converted.slice(2)), 2 + exifSegment.byteLength); // Rest of converted image data

  return result.buffer;
};

/**
 * Format bytes to readable size string.
 */
export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
