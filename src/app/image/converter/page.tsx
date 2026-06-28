import ImageConverterClient from "./ImageConverterClient";
import { createToolMetadata } from "@/lib/seo/metadata";

export const metadata = createToolMetadata("image-converter");

export default function ImageConverterPage() {
  return <ImageConverterClient />;
}
