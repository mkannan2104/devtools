import JWTDecoderClient from "./JWTDecoderClient";
import { createToolMetadata } from "@/lib/seo/metadata";

export const metadata = createToolMetadata("jwt-decoder");

export default function JWTDecoderPage() {
  return <JWTDecoderClient />;
}
