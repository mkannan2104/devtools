import UUIDGeneratorClient from "./UUIDGeneratorClient";
import { createToolMetadata } from "@/lib/seo/metadata";

export const metadata = createToolMetadata("uuid-generator");

export default function UUIDGeneratorPage() {
  return <UUIDGeneratorClient />;
}
