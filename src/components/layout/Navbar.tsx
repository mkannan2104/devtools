"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TOOLS, Tool } from "@/constants/tools";
import { Search, Menu, X, Terminal, ArrowRight, ShieldAlert } from "lucide-react";
import Icon from "./Icon";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-border-custom bg-sidebar/95 px-4 backdrop-blur-md">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white lg:hidden"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-bold tracking-tight text-white hover:opacity-90">
          <Terminal className="text-brand-blue shrink-0" size={22} />
          <span className="hidden sm:inline">Dev<span className="text-brand-blue">Dashboard</span></span>
          <span className="inline sm:hidden text-xs text-zinc-400 font-semibold uppercase tracking-wider">DevDash</span>
        </Link>
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
    </nav>
  );
};

export default Navbar;
