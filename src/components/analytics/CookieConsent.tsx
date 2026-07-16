"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Cookie, Check, X } from "lucide-react";

interface CookieConsentProps {
  onConsentChange: (consent: "accepted" | "declined") => void;
}

export function CookieConsent({ onConsentChange }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem("cookie-consent");
    if (!savedConsent) {
      // Small delay before showing the banner for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      onConsentChange(savedConsent as "accepted" | "declined");
    }
  }, [onConsentChange]);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
    onConsentChange("accepted");
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
    onConsentChange("declined");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-md animate-fade-in">
      <div className="rounded-xl border border-border-custom bg-sidebar/95 backdrop-blur-md p-5 shadow-2xl space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-brand-blue/10 rounded-lg text-brand-blue shrink-0 mt-0.5">
            <Cookie size={20} />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              Cookie Preferences
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We use third-party cookies (Google Analytics & AdSense) to measure site traffic and support our free local developer tools. Review our{" "}
              <Link href="/privacy" className="text-brand-blue hover:underline font-medium">
                Privacy Policy
              </Link>{" "}
              for more information.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            onClick={handleDecline}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-border-custom transition-all duration-200 cursor-pointer"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-brand-blue hover:bg-brand-blue-hover transition-all duration-200 shadow-md shadow-brand-blue/10 cursor-pointer"
          >
            <Check size={14} />
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
