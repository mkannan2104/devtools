import JSONFormatterClient from "./JSONFormatterClient";
import { createToolMetadata } from "@/lib/seo/metadata";

export const metadata = createToolMetadata("json-formatter");

export default function JSONFormatterPage() {
  return <JSONFormatterClient />;
}
