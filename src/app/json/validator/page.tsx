import JSONValidatorClient from "./JSONValidatorClient";
import { createToolMetadata } from "@/lib/seo/metadata";

export const metadata = createToolMetadata("json-validator");

export default function JSONValidatorPage() {
  return <JSONValidatorClient />;
}
