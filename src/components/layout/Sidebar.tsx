"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategorizedTools } from "@/constants/tools";
import Icon from "./Icon";
import { ShieldCheck, Flame } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const categorizedTools = getCategorizedTools();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-64 border-r border-border-custom bg-sidebar transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto px-4 py-6">
          <div className="space-y-6">
            {categorizedTools.map((category) => (
              <div key={category.id} className="space-y-2">
                <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {category.name}
                </h3>
                <ul className="space-y-1">
                  {category.tools.map((tool) => {
                    const isActive = pathname === tool.path;
                    return (
                      <li key={tool.id}>
                        <Link
                          href={tool.path}
                          onClick={onClose}
                          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                            isActive
                              ? "bg-brand-blue/15 text-brand-blue border-l-2 border-brand-blue pl-2.5"
                              : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                          }`}
                        >
                          <Icon
                            name={tool.iconName}
                            className={`shrink-0 ${
                              isActive ? "text-brand-blue" : "text-zinc-500"
                            }`}
                            size={18}
                          />
                          <span>{tool.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Privacy badge */}
          <div className="mt-8 rounded-lg border border-border-custom bg-background/50 p-3.5 text-xs text-zinc-400">
            <div className="flex items-center gap-2 font-semibold text-zinc-300">
              <ShieldCheck className="text-emerald-500" size={16} />
              <span>Privacy Guaranteed</span>
            </div>
            <p className="mt-1 leading-relaxed">
              All tools process input locally inside your browser. No data is sent to a server.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
