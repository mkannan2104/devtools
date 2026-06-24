"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { TOOLS, Tool, getCategorizedTools } from "@/constants/tools";
import { Search, X, Terminal, ArrowRight, ChevronDown } from "lucide-react";
import Icon from "./Icon";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const toolsButtonRef = useRef<HTMLButtonElement>(null);

  const categorizedTools = getCategorizedTools();

  // Close mega menu on page change
  useEffect(() => {
    setIsMegaOpen(false);
  }, [pathname]);

  // Handle click outside search or mega menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) {
        setIsSearchFocused(false);
      }
      if (
        isMegaOpen &&
        megaMenuRef.current &&
        !megaMenuRef.current.contains(target) &&
        toolsButtonRef.current &&
        !toolsButtonRef.current.contains(target)
      ) {
        setIsMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMegaOpen]);

  // Handle escape key to close menus
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMegaOpen(false);
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update search results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const results = TOOLS.filter(
      (tool) =>
        tool.title.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        tool.tags.some((tag) => tag.includes(query))
    );
    setSearchResults(results);
  }, [searchQuery]);

  const handleSelectResult = (path: string) => {
    setSearchQuery("");
    setIsSearchFocused(false);
    router.push(path);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border-custom bg-sidebar/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl w-full h-full flex items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Brand Logo & Tools Dropdown */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 font-mono text-lg font-bold tracking-tight text-white hover:opacity-90">
              <Terminal className="text-brand-blue shrink-0" size={22} />
              <span className="hidden sm:inline">Dev<span className="text-brand-blue">Workbench</span></span>
              <span className="inline sm:hidden text-xs text-zinc-400 font-semibold uppercase tracking-wider">DevWork</span>
            </Link>

            {/* Tools Menu Button */}
            <button
              ref={toolsButtonRef}
              onClick={() => setIsMegaOpen(!isMegaOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                isMegaOpen
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <span>Tools</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isMegaOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Global Tool Search */}
          <div className="relative flex-1 max-w-[180px] sm:max-w-md px-1 sm:px-4" ref={searchRef}>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 sm:pl-3 text-zinc-500">
                <Search size={14} className="sm:w-4 sm:h-4" />
              </span>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full rounded-md border border-border-custom bg-background py-1.5 pl-8 pr-7 text-sm text-zinc-200 placeholder-zinc-500 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 sm:pr-3 text-zinc-500 hover:text-white"
                >
                  <X size={12} className="sm:w-3.5 sm:h-3.5" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-1 right-1 sm:left-4 sm:right-4 mt-2 max-h-80 overflow-y-auto rounded-lg border border-border-custom bg-sidebar p-2 shadow-2xl">
                <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Matching Tools
                </div>
                <ul className="mt-1 space-y-0.5">
                  {searchResults.map((tool) => (
                    <li key={tool.id}>
                      <button
                        onClick={() => handleSelectResult(tool.path)}
                        className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Icon name={tool.iconName} className="text-zinc-500" size={16} />
                          <div>
                            <div className="font-medium text-xs sm:text-sm">{tool.title}</div>
                            <div className="text-2xs text-zinc-500">{tool.category}</div>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-zinc-600" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Search Empty State */}
            {isSearchFocused && searchQuery && searchResults.length === 0 && (
              <div className="absolute left-1 right-1 sm:left-4 sm:right-4 mt-2 rounded-lg border border-border-custom bg-sidebar p-4 text-center text-sm text-zinc-500 shadow-2xl">
                No tools found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>

          {/* Badges / Links */}
          <div className="hidden items-center gap-4 text-xs font-medium lg:flex">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-950 bg-emerald-950/40 px-2.5 py-0.5 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Client Side
            </span>
            <span className="text-zinc-500">v1.0.0</span>
          </div>
        </div>
      </nav>

      {/* Mega Dropdown Overlay Backdrop */}
      {isMegaOpen && (
        <div
          className="fixed inset-0 top-14 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsMegaOpen(false)}
        />
      )}

      {/* Mega Dropdown Menu Panel */}
      {isMegaOpen && (
        <div
          ref={megaMenuRef}
          className="fixed top-14 left-0 right-0 w-full bg-sidebar/95 border-b border-border-custom shadow-2xl z-50 overflow-y-auto max-h-[calc(100vh-3.5rem)] backdrop-blur-md transition-all animate-fade-in"
        >
          <div className="mx-auto max-w-7xl px-6 py-8 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {categorizedTools.map((category) => (
                <div key={category.id} className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-border-custom/50 pb-2">
                    {category.name}
                  </h3>
                  <ul className="space-y-1">
                    {category.tools.map((tool) => {
                      const isActive = pathname === tool.path;
                      return (
                        <li key={tool.id}>
                          <Link
                            href={tool.path}
                            onClick={() => setIsMegaOpen(false)}
                            className={`group flex items-center gap-3 rounded-lg p-1.5 transition-all ${
                              isActive
                                ? "bg-brand-blue/10 border-l-2 border-brand-blue pl-1"
                                : "hover:bg-zinc-800/40"
                            }`}
                          >
                            <div className={`rounded-md p-2 border shrink-0 transition-colors ${
                              isActive
                                ? "bg-brand-blue/20 text-brand-blue border-brand-blue/30"
                                : "bg-zinc-800/80 text-zinc-400 border-border-custom/50 group-hover:text-brand-blue group-hover:bg-zinc-800"
                            }`}>
                              <Icon name={tool.iconName} size={16} />
                            </div>
                            <div className={`text-sm font-semibold transition-colors ${
                              isActive ? "text-brand-blue" : "text-zinc-300 group-hover:text-white"
                            }`}>
                              {tool.title}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
