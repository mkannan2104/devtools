"use client";

import { useEffect } from "react";

const ADSENSE_CLIENT = "ca-pub-8628576985544741";
const ADSENSE_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;


export function GoogleAdSense() {
  useEffect(() => {
    if (document.querySelector(`script[src="${ADSENSE_SRC}"]`)) {
      return;
    }
    const loadScript = () => {
      if (document.querySelector(`script[src="${ADSENSE_SRC}"]`)) {
        return;
      }

      const script = document.createElement("script");
      script.src = ADSENSE_SRC;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    };

    const schedule =
      typeof window.requestIdleCallback === "function"
        ? (cb: () => void) => window.requestIdleCallback(cb)
        : (cb: () => void) => window.setTimeout(cb, 2000);

    const cancel =
      typeof window.requestIdleCallback === "function"
        ? (id: number) => window.cancelIdleCallback(id)
        : (id: number) => window.clearTimeout(id);

    const handle = schedule(loadScript);
    return () => cancel(handle);
  }, []);

  return null;
}

export default GoogleAdSense;
