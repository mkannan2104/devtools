import JSONDiffClient from "./JSONDiffClient";
import { createToolMetadata } from "@/lib/seo/metadata";

export const metadata = createToolMetadata("json-diff");

export default function JSONDiffPage() {
  return <JSONDiffClient />;
}
