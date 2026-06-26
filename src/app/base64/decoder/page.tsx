import Base64DecoderClient from "./Base64DecoderClient";
import { createToolMetadata } from "@/lib/seo/metadata";

export const metadata = createToolMetadata("base64-decoder");

export default function Base64DecoderPage() {
  return <Base64DecoderClient />;
}
