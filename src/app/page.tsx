"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TOOLS, Tool } from "@/constants/tools";
import Icon from "@/components/layout/Icon";
import { Search, Shield, Zap, Terminal, ArrowRight } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "JSON", "JWT", "Base64", "Regex", "UUID", "SQL"];

  // Filter tools based on search query and category pill
  const filteredTools = TOOLS.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) => tag.includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 py-4">
      {/* Hero Banner */}
      <section className="relative text-center space-y-6 max-w-4xl mx-auto py-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/15 px-3 py-1 text-xs font-semibold text-brand-blue mb-4 animate-fade-in">
          <Zap size={14} />
          <span>Speed-Optimized & 100% Client-Side</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Professional <span className="text-brand-blue">Developer Utilities</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          A secure, privacy-first web utility suite for developers. All tools run completely offline inside your browser.
        </p>

        {/* Core Value Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs font-semibold text-zinc-400">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-emerald-500" />
            <span>Zero server data transfer</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-amber-500" />
            <span>Instant load times</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-brand-blue" />
            <span>Developer-friendly config</span>
          </div>
        </div>
      </section>

      {/* Main Search & Category Selector */}
      <section className="space-y-6 max-w-3xl mx-auto">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500 pointer-events-none">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search for utility (e.g. JSON Formatter, Base64 Decode, SQL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border-custom bg-sidebar px-5 py-3.5 pl-12 text-zinc-200 placeholder-zinc-500 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue shadow-lg transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${selectedCategory === cat
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                  : "bg-sidebar/40 border border-border-custom text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
            >
              {cat === "All" ? "All Tools" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Tools Index Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border-custom pb-4">
          <h2 className="text-xl font-extrabold text-white">
            {selectedCategory === "All" ? "All Utilities" : `${selectedCategory} Tools`}
          </h2>
          <span className="text-xs text-zinc-500 font-semibold uppercase">
            Showing {filteredTools.length} of {TOOLS.length} items
          </span>
        </div>

        {filteredTools.length === 0 ? (
          <div className="rounded-xl border border-border-custom bg-sidebar/20 p-12 text-center space-y-3">
            <p className="text-zinc-500 text-sm">No tools match your query: &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs text-brand-blue font-bold hover:underline"
            >
              Clear filters and view all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.path}
                className="flex flex-col justify-between p-6 rounded-xl border border-border-custom bg-sidebar/50 hover:bg-sidebar hover:border-brand-blue/50 hover:-translate-y-1 transition-all duration-300 shadow-md group"
              >
                <div className="space-y-4">
                  {/* Icon & Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-zinc-800 p-2.5 text-zinc-400 group-hover:text-brand-blue group-hover:bg-zinc-800/80 transition-colors border border-border-custom/50">
                      <Icon name={tool.iconName} size={20} />
                    </div>
                    <span className="text-2xs font-bold uppercase tracking-wider text-zinc-500 bg-background/50 border border-border-custom px-2 py-0.5 rounded">
                      {tool.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-base font-extrabold text-zinc-200 group-hover:text-white transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {tool.description}
                    </p>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="flex justify-end pt-5 mt-auto">
                  <span className="text-2xs font-semibold text-zinc-500 group-hover:text-brand-blue flex items-center gap-1 transition-colors">
                    Open Tool
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Platform FAQ Section */}
      <section className="border-t border-border-custom pt-12 space-y-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-extrabold text-white text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg border border-border-custom bg-sidebar/20 space-y-2">
            <h3 className="font-bold text-sm text-zinc-200">How do DevDashboard tools work?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All tools run natively inside your browser. When you paste inputs, they are processed locally in your browser memory using Javascript, yielding immediate results.
            </p>
          </div>
          <div className="p-5 rounded-lg border border-border-custom bg-sidebar/20 space-y-2">
            <h3 className="font-bold text-sm text-zinc-200">Is my data secure?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Yes. DevDashboard transfers 0% of your data back to a server or third-party loggers. Ideal for developer credentials, sensitive client payloads, and production database queries.
            </p>
          </div>
          <div className="p-5 rounded-lg border border-border-custom bg-sidebar/20 space-y-2">
            <h3 className="font-bold text-sm text-zinc-200">Are there any paid limits?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No. In V1, all features, formats, generators, validators, and comparators are 100% free and open without limits or subscription barriers.
            </p>
          </div>
          <div className="p-5 rounded-lg border border-border-custom bg-sidebar/20 space-y-2">
            <h3 className="font-bold text-sm text-zinc-200">Can I work offline?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Yes. Once loaded, since no server queries are made, all core conversion operations continue working seamlessly without an internet connection.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
