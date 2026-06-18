"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const is404 = pathname === "/404";

  if (is404) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground p-4">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Navigation Bar */}
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Container */}
      <div className="flex flex-1 pt-14">
        {/* Left Navigation Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl w-full h-full">
              {children}
            </div>
          </main>
          
          {/* Footer inside the content flow */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
