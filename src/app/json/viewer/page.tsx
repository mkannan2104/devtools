import JSONViewerClient from "./JSONViewerClient";
import { createToolMetadata } from "@/lib/seo/metadata";

export const metadata = createToolMetadata("json-viewer");

export default function JSONViewerPage() {
  return <JSONViewerClient />;
}
