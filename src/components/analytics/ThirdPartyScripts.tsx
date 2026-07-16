"use client";

import { useState } from "react";
import Script from "next/script";
import GoogleAdSense from "./GoogleAdSense";
import CookieConsent from "./CookieConsent";

const GA_MEASUREMENT_ID = "G-BQDKK60PRJ";

export function ThirdPartyScripts() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);

  const handleConsentChange = (newConsent: "accepted" | "declined") => {
    setConsent(newConsent);
  };

  return (
    <>
      <CookieConsent onConsentChange={handleConsentChange} />
      {consent === "accepted" && (
        <>
          <GoogleAdSense />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
}

export default ThirdPartyScripts;
