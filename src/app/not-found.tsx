"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/404");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-3 font-mono">
      <Loader2 className="animate-spin text-brand-blue" size={24} />
      <span className="text-sm text-zinc-500">Redirecting to /404...</span>
    </div>
  );
}
