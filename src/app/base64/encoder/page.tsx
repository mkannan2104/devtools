import Base64EncoderClient from "./Base64EncoderClient";
import { createToolMetadata } from "@/lib/seo/metadata";

export const metadata = createToolMetadata("base64-encoder");

export default function Base64EncoderPage() {
  return <Base64EncoderClient />;
}
