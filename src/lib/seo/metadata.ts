import type { Metadata } from "next";
import { TOOLS } from "@/constants/tools";

const SITE_URL = "https://www.developerworkbench.in";
const DEFAULT_OG_IMAGE = "/og-image.png";

const CATEGORY_OG_IMAGES: Record<string, string> = {
  JSON: "/og-image.png",
  JWT: "/og-image.png",
  Base64: "/og-image.png",
  Regex: "/og-image.png",
  UUID: "/og-image.png",
  SQL: "/og-image.png",
  Text: "/og-image.png",
};

export function createToolMetadata(toolId: string): Metadata {
  const tool = TOOLS.find((t) => t.id === toolId);
  if (!tool) {
    throw new Error(`Unknown tool id: ${toolId}`);
  }

  const ogImage = CATEGORY_OG_IMAGES[tool.category] ?? DEFAULT_OG_IMAGE;
  const pageTitle = `${tool.title} Online | Developer Workbench`;

  return {
    title: pageTitle,
    description: tool.seoDescription,
    keywords: [tool.title, tool.category, ...tool.tags],
    alternates: {
      canonical: tool.path,
    },
    openGraph: {
      title: pageTitle,
      description: tool.seoDescription,
      type: "website",
      url: `${SITE_URL}${tool.path}`,
      siteName: "Developer Workbench",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${tool.title} — Developer Workbench`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: tool.seoDescription,
      images: [ogImage],
    },
  };
}

export function createStaticPageMetadata(options: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: options.title,
    description: options.description,
    alternates: {
      canonical: options.path,
    },
    openGraph: {
      title: options.title,
      description: options.description,
      type: "website",
      url: `${SITE_URL}${options.path}`,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
  };
}
