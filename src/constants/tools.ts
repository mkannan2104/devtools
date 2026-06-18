export interface Tool {
  id: string;
  title: string;
  category: string;
  description: string;
  seoDescription: string;
  path: string;
  iconName: string;
  tags: string[];
}

export interface ToolCategory {
  id: string;
  name: string;
  tools: Tool[];
}

export const TOOLS: Tool[] = [
  {
    id: "json-formatter",
    title: "JSON Formatter",
    category: "JSON",
    description: "Format, beautify, and prettify raw JSON code with custom spacing options.",
    seoDescription: "Free online JSON Formatter and beautifier. Prettify raw JSON data instantly in your browser with syntax highlighting. Clean, privacy-first, and runs completely offline.",
    path: "/json/formatter",
    iconName: "Braces",
    tags: ["json", "format", "beautify", "prettify", "indent"]
  },
  {
    id: "json-validator",
    title: "JSON Validator",
    category: "JSON",
    description: "Validate JSON syntax, find missing commas or brackets, and locate errors in real-time.",
    seoDescription: "Check if your JSON is valid with our online JSON Validator. Get clear error messages, line numbers, and precise syntax correction tips. 100% secure client-side validation.",
    path: "/json/validator",
    iconName: "CheckCircle",
    tags: ["json", "validate", "lint", "syntax", "error"]
  },
  {
    id: "json-viewer",
    title: "JSON Viewer",
    category: "JSON",
    description: "Explore large JSON structures interactively with an expandable tree view and search.",
    seoDescription: "Interactive JSON Viewer and explorer. Inspect, analyze, and browse complex JSON data hierarchies using a dynamic tree view. Fast, responsive, and privacy-focused.",
    path: "/json/viewer",
    iconName: "Eye",
    tags: ["json", "view", "inspect", "tree", "explore"]
  },
  {
    id: "json-diff",
    title: "JSON Diff",
    category: "JSON",
    description: "Compare two JSON objects side-by-side and highlight structural or value differences.",
    seoDescription: "Compare two JSON documents online using our JSON Diff checker. Identify additions, modifications, and deletions side-by-side with color-coded syntax differences.",
    path: "/json/diff",
    iconName: "Columns",
    tags: ["json", "diff", "compare", "patch", "side-by-side"]
  },
  {
    id: "jwt-decoder",
    title: "JWT Decoder",
    category: "JWT",
    description: "Decode JSON Web Tokens (JWT) client-side to inspect headers, payload, and signature status.",
    seoDescription: "Decode and inspect JWT (JSON Web Tokens) online. Extract token headers, payload data, and expiration times safely without sending tokens to any server.",
    path: "/jwt/decoder",
    iconName: "Key",
    tags: ["jwt", "decode", "token", "header", "payload", "auth"]
  },
  {
    id: "base64-encoder",
    title: "Base64 Encoder",
    category: "Base64",
    description: "Convert text or binary data into Base64 format securely.",
    seoDescription: "Securely encode text or strings to Base64 format online. Fast client-side conversion for headers, URLs, and standard coding tasks.",
    path: "/base64/encoder",
    iconName: "ArrowUpRight",
    tags: ["base64", "encode", "binary", "text", "converter"]
  },
  {
    id: "base64-decoder",
    title: "Base64 Decoder",
    category: "Base64",
    description: "Convert Base64 formatted strings back into readable text format.",
    seoDescription: "Decode Base64 strings back to clean plain text online. Privacy-first, local decoding inside your browser with automatic detection.",
    path: "/base64/decoder",
    iconName: "ArrowDownLeft",
    tags: ["base64", "decode", "binary", "text", "converter"]
  },
  {
    id: "regex-tester",
    title: "Regex Tester",
    category: "Regex",
    description: "Test regular expressions with real-time match highlighting, details, and substitution.",
    seoDescription: "Online Regular Expression (Regex) tester. Test expressions with matches, capturing groups, and validation patterns in real-time. Includes syntax reference.",
    path: "/regex/tester",
    iconName: "Regex",
    tags: ["regex", "test", "match", "replace", "expression"]
  },
  {
    id: "uuid-generator",
    title: "UUID Generator",
    category: "UUID",
    description: "Generate cryptographically secure UUIDs (v4) individually or in bulk.",
    seoDescription: "Generate random, secure UUID v4 strings online. Bulk generation options, customizable casing, and quick copy features for developers.",
    path: "/uuid/generator",
    iconName: "Fingerprint",
    tags: ["uuid", "guid", "generate", "random", "unique"]
  },
  {
    id: "sql-formatter",
    title: "SQL Formatter",
    category: "SQL",
    description: "Beautify SQL queries for MySQL, PostgreSQL, SQLite, and standard SQL dialects.",
    seoDescription: "Online SQL Formatter and SQL beautifier. Prettify and clean complex SQL query scripts with proper indentation and capitalized keywords.",
    path: "/sql/formatter",
    iconName: "Database",
    tags: ["sql", "format", "beautify", "query", "database", "postgres", "mysql"]
  },
  {
    id: "string-escaper",
    title: "String Escaper",
    category: "Text",
    description: "Escape or unescape text for JSON, HTML, URL, and Javascript string literals.",
    seoDescription: "Free online String Escaper and Unescaper. Convert text safely into JSON escaped strings, URL percent-encoded values, and HTML entities. 100% private.",
    path: "/text/escape",
    iconName: "FileText",
    tags: ["escape", "unescape", "string", "url-encode", "html-encode", "json-escape"]
  }
];

export const CATEGORIES: { [key: string]: string } = {
  JSON: "JSON Utilities",
  JWT: "JSON Web Tokens",
  Base64: "Base64 Encoding",
  Regex: "Regular Expressions",
  UUID: "Identifiers",
  SQL: "SQL Formatting",
  Text: "Text Utilities"
};

export const getCategorizedTools = (): ToolCategory[] => {
  const categoriesMap: { [key: string]: Tool[] } = {};
  
  TOOLS.forEach(tool => {
    if (!categoriesMap[tool.category]) {
      categoriesMap[tool.category] = [];
    }
    categoriesMap[tool.category].push(tool);
  });

  return Object.keys(categoriesMap).map(catKey => ({
    id: catKey.toLowerCase(),
    name: CATEGORIES[catKey] || catKey,
    tools: categoriesMap[catKey]
  }));
};
