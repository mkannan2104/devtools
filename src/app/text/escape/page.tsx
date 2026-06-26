import StringEscaperClient from "./StringEscaperClient";
import { createToolMetadata } from "@/lib/seo/metadata";

export const metadata = createToolMetadata("string-escaper");

export default function StringEscaperPage() {
  return <StringEscaperClient />;
}
