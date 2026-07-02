"use client";

import React, { useState, useEffect } from "react";
import MonacoInput from "@/components/editors/MonacoInput";
import MonacoOutput from "@/components/editors/MonacoOutput";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolGuide from "@/components/tools/ToolGuide";
import ToolSchema from "@/components/tools/ToolSchema";
import ToolExamples, { ToolExample } from "@/components/tools/ToolExamples";
import ToolFAQ, { FAQItem } from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";
import { formatSql } from "@/lib/sql/formatter";
import { Sparkles, Type } from "lucide-react";

const EXAMPLES: ToolExample[] = [
  {
    title: "Select Join Query",
    description: "A standard SELECT statement with INNER JOINs, WHERE filtering, and GROUP BY fields.",
    content: "select users.id, users.name, count(orders.id) as total_orders from users inner join orders on users.id = orders.user_id where orders.status = 'completed' and orders.created_at >= '2026-01-01' group by users.id, users.name order by total_orders desc limit 10;"
  },
  {
    title: "Update Statement",
    description: "An UPDATE query changing multiple columns with conditional filters.",
    content: "update user_profiles set status = 'active', updated_at = '2026-06-18 10:00:00', login_count = login_count + 1 where last_login < '2026-05-01' and role != 'admin';"
  },
  {
    title: "Insert Statement",
    description: "A standard INSERT query with columns list and values.",
    content: "insert into configurations (key_name, value_data, is_active, created_by) values ('auth_token', 'xyz123', true, 101), ('session_timeout', '3600', false, 102);"
  }
];

const FAQS: FAQItem[] = [
  {
    question: "What is an SQL Formatter?",
    answer: "An SQL Formatter (or SQL beautifier) reorganizes raw, single-line SQL queries by injecting line breaks and indentations. It also capitalizes SQL statement keywords to improve visual scanning and query readability."
  },
  {
    question: "Which databases are supported?",
    answer: "The formatting engine supports queries matching standard SQL dialects, including MySQL, PostgreSQL, SQLite, Microsoft SQL Server, and Oracle queries."
  },
  {
    question: "Is my database schema or query leaked online?",
    answer: "No. Json Tools SQL Formatter performs formatting and capitalization entirely on your device using client-side JavaScript. None of your queries are transmitted to an external server."
  }
];

export const SQLFormatterClient: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [uppercase, setUppercase] = useState(true);
  const [indent, setIndent] = useState("2");
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"input" | "output">("input");

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const runFormat = (val: string, isUpper = uppercase, indentSize = indent) => {
    if (!val.trim()) {
      setOutput("");
      return;
    }
    const size = parseInt(indentSize, 10);
    const formatted = formatSql(val, isUpper, size);
    setOutput(formatted);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    runFormat(value, uppercase, indent);
  };

  const handleToggleCasing = (upper: boolean) => {
    setUppercase(upper);
    runFormat(input, upper, indent);
  };

  const handleIndentChange = (size: string) => {
    setIndent(size);
    runFormat(input, uppercase, size);
  };

  return (
    <div className="space-y-6">
      <ToolHeader
        title="SQL Formatter & Beautifier"
        category="SQL"
        description="Prettify and clean complex SQL query scripts instantly. Standardize keyword casing (UPPERCASE vs lowercase) and choose spacing levels. Supports MySQL, Postgres, and standard SQL dialects."
        iconName="Database"
        externalUrl="https://en.wikipedia.org/wiki/SQL"
        externalUrlLabel="ISO/IEC 9075 SQL Standard Reference"
      />
      <ToolSchema toolId="sql-formatter" />
      <ToolGuide toolId="sql-formatter" />

      {/* Settings Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border-custom bg-sidebar/40 p-4 shadow-md">
        {/* Indent spacing */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium text-zinc-400">Spacing:</label>
          <div className="inline-flex rounded-lg border border-border-custom bg-background p-1">
            <button
              onClick={() => handleIndentChange("2")}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${indent === "2" ? "bg-brand-blue text-white" : "text-zinc-400 hover:text-white"
                }`}
            >
              2 Spaces
            </button>
            <button
              onClick={() => handleIndentChange("4")}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${indent === "4" ? "bg-brand-blue text-white" : "text-zinc-400 hover:text-white"
                }`}
            >
              4 Spaces
            </button>
          </div>
        </div>

        {/* Casing Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium text-zinc-400">Keywords Casing:</label>
          <div className="inline-flex rounded-lg border border-border-custom bg-background p-1">
            <button
              onClick={() => handleToggleCasing(true)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all flex items-center gap-1 ${uppercase ? "bg-brand-blue text-white" : "text-zinc-400 hover:text-white"
                }`}
            >
              <Type size={12} />
              UPPERCASE
            </button>
            <button
              onClick={() => handleToggleCasing(false)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all flex items-center gap-1 ${!uppercase ? "bg-brand-blue text-white" : "text-zinc-400 hover:text-white"
                }`}
            >
              <Type size={12} />
              lowercase
            </button>
          </div>
        </div>
      </div>

      {/* Editors Grid */}
      {mounted && isMobile ? (
        <div className="space-y-4">
          <div className="flex rounded-lg border border-border-custom bg-sidebar overflow-hidden shrink-0">
            <button
              onClick={() => setActiveTab("input")}
              className={`flex-1 py-2.5 text-center text-xs font-semibold border-r border-border-custom/50 transition-all ${activeTab === "input" ? "bg-background/80 text-white font-bold" : "text-zinc-400 hover:bg-zinc-800/30"
                }`}
            >
              SQL Input
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`flex-1 py-2.5 text-center text-xs font-semibold transition-all ${activeTab === "output" ? "bg-background/80 text-white font-bold" : "text-zinc-400 hover:bg-zinc-800/30"
                }`}
            >
              Formatted SQL (Output)
            </button>
          </div>

          <div className="h-[550px]">
            {activeTab === "input" ? (
              <MonacoInput
                value={input}
                onChange={handleInputChange}
                language="sql"
                title="Raw SQL Query"
                placeholder="select * from users where id = 1..."
              />
            ) : (
              <MonacoOutput
                value={output}
                language="sql"
                title="Beautified SQL Result"
                downloadFilename="formatted.sql"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div className="h-[550px]">
            <MonacoInput
              value={input}
              onChange={handleInputChange}
              language="sql"
              title="Raw SQL Query"
              placeholder="select * from users where id = 1..."
            />
          </div>
          <div className="h-[550px]">
            <MonacoOutput
              value={output}
              language="sql"
              title="Beautified SQL Result"
              downloadFilename="formatted.sql"
            />
          </div>
        </div>
      )}

      <ToolExamples examples={EXAMPLES} onSelect={handleInputChange} />
      <ToolFAQ faqs={FAQS} toolName="SQL Formatter" />
      <RelatedTools currentToolId="sql-formatter" category="SQL" />
    </div>
  );
};

export default SQLFormatterClient;
