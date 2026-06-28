import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/layout/AppLayout";
import ThirdPartyScripts from "@/components/analytics/ThirdPartyScripts";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.developerworkbench.in"),
  title: {
    default: "Developer Workbench - Privacy-First Local Developer Utilities",
    template: "%s | Developer Workbench",
  },
  description: "Secure offline developer utilities. Format JSON/SQL, decode JWT/Base64, test regex, and generate UUIDs locally in your browser with zero data leaks.",
  keywords: [
    "developer tools",
    "JSON formatter",
    "JWT decoder",
    "Base64 encoder",
    "Base64 decoder",
    "UUID generator",
    "SQL formatter",
    "Regex tester",
    "offline developer tools",
    "privacy-first dev tools"
  ],
  authors: [{ name: "Developer Workbench Team" }],
  creator: "Developer Workbench",
  icons: {
    icon: [
      { url: "/images/icon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/icon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/icon/favicon.ico" }
    ],
    apple: [
      { url: "/images/icon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
  manifest: "/images/icon/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.developerworkbench.in",
    siteName: "Developer Workbench",
    title: "Developer Workbench - Privacy-First Local Developer Utilities",
    description: "A secure developer tools dashboard running 100% inside your browser. No data leaves your machine.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Developer Workbench Banner"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Workbench - Privacy-First Local Developer Utilities",
    description: "A secure developer tools dashboard running 100% inside your browser.",
    images: ["/og-image.png"],
    site: "@devworkbench",
    creator: "@devworkbench",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  other: {
    "google-adsense-account": "ca-pub-8628576985544741",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Developer Workbench",
    "url": "https://www.developerworkbench.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.developerworkbench.in/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Developer Workbench",
    "url": "https://www.developerworkbench.in",
    "logo": "https://www.developerworkbench.in/og-image.png",
    "sameAs": [
      "https://x.com/devworkbench_in",
      "https://www.instagram.com/devworkbench"
    ]
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ThirdPartyScripts />
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
