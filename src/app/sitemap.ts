import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://devdashboard.org";
  
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
