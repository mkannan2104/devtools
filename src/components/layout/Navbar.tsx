"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const toolsButtonRef = useRef<HTMLButtonElement>(null);

  const categorizedTools = getCategorizedTools();

  // Close mega menu on page change
  useEffect(() => {
    setIsMegaOpen(false);
    setIsMobileSearchOpen(false);
    setIsSearchFocused(false);
    setSearchQuery("");
  }, [pathname]);

  // Handle click outside search or mega menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) {
        setIsSearchFocused(false);
        setIsMobileSearchOpen(false);
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
        setIsMobileSearchOpen(false);
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
    setIsMobileSearchOpen(false);
    router.push(path);
  };

  const openMobileSearch = () => {
    setIsMobileSearchOpen(true);
    setIsSearchFocused(true);
    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setIsSearchFocused(false);
    setSearchQuery("");
  };

  const showSearchDropdown =
    isSearchFocused && (searchResults.length > 0 || Boolean(searchQuery.trim()));

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border-custom bg-sidebar/95 backdrop-blur-md overflow-visible">
        <div className="mx-auto max-w-7xl w-full h-full flex items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
          {/* Brand Logo & Tools Dropdown */}
          <div className={`flex items-center gap-2 sm:gap-4 shrink-0 ${isMobileSearchOpen ? "hidden sm:flex" : ""}`}>
            <Link href="/" className="flex items-center hover:opacity-90 shrink-0">
              <Image
                src="/images/logo.png"
                alt="DevWorkbench Logo"
                width={162}
                height={36}
                priority
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>

            {/* Tools Menu Button */}
            <button
              ref={toolsButtonRef}
              onClick={() => setIsMegaOpen(!isMegaOpen)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                isMegaOpen
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <span>Tools</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isMegaOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Mobile search toggle */}
          {!isMobileSearchOpen && (
            <button
              type="button"
              onClick={openMobileSearch}
              aria-label="Open search"
              className="sm:hidden ml-auto flex items-center justify-center rounded-md border border-border-custom bg-background p-2 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
            >
              <Search size={18} />
            </button>
          )}

          {/* Global Tool Search */}
          <div
            className={`relative min-w-0 ${
              isMobileSearchOpen
                ? "flex-1 sm:flex-initial sm:flex-1 sm:max-w-md sm:px-4"
                : "hidden sm:block sm:flex-1 sm:max-w-md sm:px-4"
            }`}
            ref={searchRef}
          >
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500 pointer-events-none">
                <Search size={16} />
              </span>
              <input
                ref={searchInputRef}
                type="text"
                enterKeyHint="search"
                autoComplete="off"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full rounded-md border border-border-custom bg-background py-2 pl-9 pr-9 text-base sm:text-sm text-zinc-200 placeholder-zinc-500 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
              />
              {(searchQuery || isMobileSearchOpen) && (
                <button
                  type="button"
                  onClick={isMobileSearchOpen ? closeMobileSearch : () => setSearchQuery("")}
                  aria-label={isMobileSearchOpen ? "Close search" : "Clear search"}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="fixed left-3 right-3 top-[3.75rem] z-[60] max-h-[min(24rem,calc(100vh-5rem))] overflow-y-auto rounded-lg border border-border-custom bg-sidebar p-2 shadow-2xl sm:absolute sm:left-0 sm:right-0 sm:top-full sm:mt-2 sm:max-h-80">
                <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Matching Tools
                </div>
                <ul className="mt-1 space-y-0.5">
                  {searchResults.map((tool) => (
                    <li key={tool.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectResult(tool.path)}
                        className="flex w-full items-center justify-between rounded-md px-2 py-2.5 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <Icon name={tool.iconName} className="text-zinc-500 shrink-0" size={16} />
                          <div className="min-w-0">
                            <div className="font-medium text-sm truncate">{tool.title}</div>
                            <div className="text-xs text-zinc-500">{tool.category}</div>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-zinc-600 shrink-0 ml-2" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Search Empty State */}
            {showSearchDropdown && searchQuery && searchResults.length === 0 && (
              <div className="fixed left-3 right-3 top-[3.75rem] z-[60] rounded-lg border border-border-custom bg-sidebar p-4 text-center text-sm text-zinc-500 shadow-2xl sm:absolute sm:left-0 sm:right-0 sm:top-full sm:mt-2">
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
