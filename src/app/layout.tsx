import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/layout/AppLayout";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.developerworkbench.in"),
  title: {
    default: "Developer Workbench - Privacy-First Local Developer Utilities",
    template: "%s | Developer Workbench",
  },
  description: "A secure, privacy-first developer tools workbench. Formatter, JWT decoder, Base64 encoder/decoder, Regex tester, SQL formatter, and UUID generator working entirely offline in your browser.",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.developerworkbench.in",
    siteName: "Developer Workbench",
    title: "Developer Workbench - Privacy-First Local Developer Utilities",
    description: "A secure developer tools dashboard running 100% inside your browser. No data leaves your machine.",
    images: [
      {
        url: "/og-image.png",
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
    "logo": "https://www.developerworkbench.in/og-image.png"
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CWH028KECF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CWH028KECF');
          `}
        </Script>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
