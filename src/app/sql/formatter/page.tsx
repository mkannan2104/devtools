import SQLFormatterClient from "./SQLFormatterClient";
import { createToolMetadata } from "@/lib/seo/metadata";

export const metadata = createToolMetadata("sql-formatter");

export default function SQLFormatterPage() {
  return <SQLFormatterClient />;
}
