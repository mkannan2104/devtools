import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("host") || "www.developerworkbench.in";
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const baseUrl = `${protocol}://${host}`;
  
  const routes = [
    "",
    "/json/formatter",
    "/json/validator",
    "/json/viewer",
    "/json/diff",
    "/jwt/decoder",
    "/base64/encoder",
    "/base64/decoder",
    "/regex/tester",
    "/uuid/generator",
    "/sql/formatter",
    "/text/escape",
    "/docs",
    "/privacy",
    "/terms"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
