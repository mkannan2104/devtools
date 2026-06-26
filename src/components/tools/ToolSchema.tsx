import React from "react";
import { TOOLS } from "@/constants/tools";

const SITE_URL = "https://www.developerworkbench.in";

interface ToolSchemaProps {
  toolId: string;
}

export const ToolSchema: React.FC<ToolSchemaProps> = ({ toolId }) => {
  const tool = TOOLS.find((t) => t.id === toolId);
  if (!tool) return null;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.seoDescription,
    url: `${SITE_URL}${tool.path}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: tool.tags,
    isAccessibleForFree: true,
    creator: {
      "@type": "Organization",
      name: "Developer Workbench",
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tool.title,
        item: `${SITE_URL}${tool.path}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};

export default ToolSchema;
