import React from "react";
import Script from "next/script";

export interface FAQItem {
  question: string;
  answer: string;
}

interface ToolFAQProps {
  faqs: FAQItem[];
  toolName: string;
}

export const ToolFAQ: React.FC<ToolFAQProps> = ({ faqs, toolName }) => {
  if (!faqs || faqs.length === 0) return null;

  // Build FAQPage schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <div className="mt-12 border-t border-border-custom pt-8">
      {/* Schema Injection */}
      <Script
        id={`faq-schema-${toolName.toLowerCase().replace(/\s+/g, "-")}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <h2 className="text-lg font-bold text-white mb-6">Frequently Asked Questions ({toolName})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-border-custom bg-sidebar/35 p-5 space-y-2 hover:border-zinc-700 transition-colors"
          >
            <h3 className="font-semibold text-zinc-100 text-sm md:text-base">
              {faq.question}
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolFAQ;
