import RegexTesterClient from "./RegexTesterClient";
import { createToolMetadata } from "@/lib/seo/metadata";

export const metadata = createToolMetadata("regex-tester");

export default function RegexTesterPage() {
  return <RegexTesterClient />;
}
