export interface ToolGuideContent {
  whenToUse: string[];
  supportedFormats: string[];
  advantages: string[];
  relatedLinks?: { label: string; href: string }[];
}

export const TOOL_GUIDES: Record<string, ToolGuideContent> = {
  "json-formatter": {
    whenToUse: [
      "You receive minified JSON from an API response and need readable structure for debugging.",
      "You are preparing a JSON config file for code review or documentation.",
      "You want to compress JSON to a single line before sending it in a request payload.",
    ],
    supportedFormats: [
      "Standard JSON (RFC 8259) objects and arrays",
      "UTF-8 text with nested objects, arrays, strings, numbers, booleans, and null",
      "Output indentation: 2 spaces, 4 spaces, tabs, or minified (no whitespace)",
    ],
    advantages: [
      "Runs entirely in your browser — sensitive API responses never leave your machine.",
      "Instant formatting with syntax highlighting on desktop via Monaco Editor.",
      "No account, upload limit, or paywall required.",
    ],
    relatedLinks: [
      { label: "Validate JSON syntax first", href: "/json/validator" },
      { label: "Explore structure in tree view", href: "/json/viewer" },
    ],
  },
  "json-validator": {
    whenToUse: [
      "A build pipeline or integration fails and you need to confirm whether raw JSON is syntactically valid.",
      "You are editing a large config file and want immediate feedback on missing commas or quotes.",
      "You need a quick structural summary (key count, depth, file size) before importing data.",
    ],
    supportedFormats: [
      "Standard JSON (RFC 8259)",
      "Nested objects and arrays of any depth",
      "UTF-8 encoded text pasted from files, logs, or clipboard",
    ],
    advantages: [
      "Pinpoints syntax errors with clear messages — no data sent to a server.",
      "Provides a validation report with size, character count, keys, and nesting depth.",
      "Pairs well with the JSON Formatter and JSON Viewer in the same suite.",
    ],
    relatedLinks: [
      { label: "Format valid JSON", href: "/json/formatter" },
      { label: "Compare two JSON files", href: "/json/diff" },
    ],
  },
  "json-viewer": {
    whenToUse: [
      "You need to browse a large API response without scrolling through thousands of lines of text.",
      "You want to search for a specific key or value inside a deep JSON hierarchy.",
      "You are exploring unknown payload structure during integration or debugging work.",
    ],
    supportedFormats: [
      "Any valid JSON document (objects, arrays, primitives)",
      "Large payloads rendered as an expandable/collapsible tree",
      "Live text search across keys and values",
    ],
    advantages: [
      "Tree view makes deep structures easy to navigate on desktop and mobile.",
      "100% client-side — confidential production data stays on your device.",
      "Works offline once the page is loaded.",
    ],
    relatedLinks: [
      { label: "Validate before viewing", href: "/json/validator" },
      { label: "Beautify raw JSON", href: "/json/formatter" },
    ],
  },
  "json-diff": {
    whenToUse: [
      "You need to see what changed between two API response versions or config snapshots.",
      "You are reviewing a pull request that modifies JSON configuration files.",
      "You want a visual side-by-side comparison before applying a JSON Patch.",
    ],
    supportedFormats: [
      "Two JSON text inputs (original and modified)",
      "Valid JSON recommended; invalid JSON is flagged before compare",
      "Side-by-side diff with addition and deletion highlighting",
    ],
    advantages: [
      "Compare locally — tokens, credentials, and customer data never uploaded.",
      "Monaco Diff Editor provides familiar IDE-style highlighting.",
      "Swap, clear, and example templates speed up repetitive comparisons.",
    ],
    relatedLinks: [
      { label: "Format JSON before diffing", href: "/json/formatter" },
      { label: "Validate JSON syntax", href: "/json/validator" },
    ],
  },
  "jwt-decoder": {
    whenToUse: [
      "You receive a JWT from an OAuth or API login flow and need to inspect claims.",
      "You want to verify token expiry (exp) and algorithm (alg) without using a server tool.",
      "You are debugging authentication issues in development or staging environments.",
    ],
    supportedFormats: [
      "Standard three-part JWT strings (header.payload.signature)",
      "Common algorithms: HS256, RS256, ES256, and others in the header",
      "Base64URL-encoded header and payload segments",
    ],
    advantages: [
      "Tokens are decoded locally — critical for security audits and production debugging.",
      "Shows expiry status, algorithm, and formatted header/payload JSON.",
      "No login or API key required.",
    ],
    relatedLinks: [
      { label: "Decode Base64 segments", href: "/base64/decoder" },
      { label: "Format decoded JSON", href: "/json/formatter" },
    ],
  },
  "base64-encoder": {
    whenToUse: [
      "You need to encode text for HTTP Basic Auth headers or data URIs.",
      "You are preparing a string for embedding in JSON or XML where binary-safe encoding is required.",
      "You want a quick encode without installing command-line tools.",
    ],
    supportedFormats: [
      "Plain text and UTF-8 Unicode strings",
      "Standard Base64 output",
      "File upload for encoding text file contents",
    ],
    advantages: [
      "Encoding happens in-browser — passwords and secrets are not logged on a server.",
      "Copy, paste, and file upload actions built into the editor toolbar.",
      "Complements the Base64 Decoder on the same site.",
    ],
    relatedLinks: [
      { label: "Decode Base64 text", href: "/base64/decoder" },
      { label: "Escape for JSON strings", href: "/text/escape" },
    ],
  },
  "base64-decoder": {
    whenToUse: [
      "You have a Base64 string from an email attachment, API, or config and need the original text.",
      "You are verifying encoded credentials or tokens during development.",
      "You received garbled text and suspect it is Base64-encoded.",
    ],
    supportedFormats: [
      "Standard Base64 and URL-safe Base64 variants",
      "UTF-8 decoded text output",
      "Pasted text or uploaded .txt files",
    ],
    advantages: [
      "Private decoding — no data transmitted to third-party services.",
      "Instant results with copy and download options.",
      "Pairs with the Base64 Encoder for round-trip testing.",
    ],
    relatedLinks: [
      { label: "Encode text to Base64", href: "/base64/encoder" },
      { label: "Inspect JWT payloads", href: "/jwt/decoder" },
    ],
  },
  "regex-tester": {
    whenToUse: [
      "You are writing or debugging a regular expression before using it in application code.",
      "You need to see capture groups and match indices for complex patterns.",
      "You want to test flags (global, case-insensitive, multiline) interactively.",
    ],
    supportedFormats: [
      "JavaScript-compatible regular expressions",
      "Flags: g, i, m, s, u, y",
      "Multiline test strings with real-time match highlighting",
    ],
    advantages: [
      "Live highlighting shows every match and capture group immediately.",
      "Runs locally — test data with PII or secrets stays private.",
      "Example patterns included for email, URLs, dates, and more.",
    ],
    relatedLinks: [
      { label: "Escape special characters", href: "/text/escape" },
      { label: "Format structured text", href: "/json/formatter" },
    ],
  },
  "uuid-generator": {
    whenToUse: [
      "You need unique identifiers for database records, API resources, or test fixtures.",
      "You want cryptographically random UUID v4 values without a backend service.",
      "You need multiple UUIDs at once for bulk seeding or load tests.",
    ],
    supportedFormats: [
      "UUID version 4 (random)",
      "Standard 8-4-4-4-12 hexadecimal format",
      "Uppercase or lowercase output",
      "Single or bulk generation (up to 100 per batch)",
    ],
    advantages: [
      "Uses crypto.getRandomValues() in the browser for strong randomness.",
      "One-click copy for single or all generated UUIDs.",
      "No rate limits — generate as many as your workflow needs.",
    ],
    relatedLinks: [
      { label: "Format JSON configs", href: "/json/formatter" },
      { label: "Encode identifiers", href: "/base64/encoder" },
    ],
  },
  "sql-formatter": {
    whenToUse: [
      "You inherited an unreadable single-line SQL query from logs or a ORM.",
      "You are preparing SQL for documentation, code review, or team sharing.",
      "You want consistent keyword casing and indentation before committing to version control.",
    ],
    supportedFormats: [
      "Standard SQL and common dialects (MySQL, PostgreSQL, SQLite-style syntax)",
      "SELECT, INSERT, UPDATE, DELETE, JOIN, and subquery statements",
      "Multiple statements separated by semicolons",
    ],
    advantages: [
      "Beautifies locally — production queries with table names stay private.",
      "Improves readability without changing query semantics.",
      "Monaco editor with SQL syntax highlighting on desktop.",
    ],
    relatedLinks: [
      { label: "Escape string literals", href: "/text/escape" },
      { label: "Format JSON API payloads", href: "/json/formatter" },
    ],
  },
  "string-escaper": {
    whenToUse: [
      "You need to escape a string before embedding it in JSON, HTML, or a URL.",
      "You copied escaped text from logs and want the original readable string.",
      "You are building test fixtures with special characters (quotes, newlines, unicode).",
    ],
    supportedFormats: [
      "JSON string escaping and unescaping",
      "HTML entity encoding and decoding",
      "URL percent-encoding and decoding",
      "JavaScript string literal escaping",
    ],
    advantages: [
      "Four escape modes in one tool — no switching between websites.",
      "Bidirectional escape and unescape for quick round-trip checks.",
      "All processing is client-side for sensitive content.",
    ],
    relatedLinks: [
      { label: "Format JSON documents", href: "/json/formatter" },
      { label: "Test regex on escaped text", href: "/regex/tester" },
    ],
  },
  "image-converter": {
    whenToUse: [
      "You want to convert image formats (e.g. PNG to JPG, HEIC to WEBP) without uploading files to a third-party server.",
      "You need to compress image file size by adjusting the quality level for web optimization.",
      "You want to resize image dimensions (width/height) while maintaining aspect ratios client-side.",
      "You want to strip EXIF metadata, ICC color profiles, or adjust DPI resolutions for privacy and performance."
    ],
    supportedFormats: [
      "Inputs: JPG, JPEG, PNG, WEBP, GIF, BMP, TIFF, AVIF, HEIC, SVG (Rasterize)",
      "Outputs: JPG, PNG, WEBP, AVIF, BMP, TIFF",
      "Batch mode: Process up to 10 images concurrently in your browser"
    ],
    advantages: [
      "100% Client-Side: Conversion runs completely locally via canvas and JS decoders. Your files are never uploaded.",
      "HEIC Support: Process Apple HEIC photos locally without external converters.",
      "Advanced Tweaks: Set custom DPI, subsampling levels, background colors for transparency, and progressive JPEG encoding."
    ],
    relatedLinks: [
      { label: "Encode images to Base64", href: "/base64/encoder" },
      { label: "Format configuration files", href: "/json/formatter" }
    ]
  }
};

export function getToolGuide(toolId: string): ToolGuideContent | undefined {
  return TOOL_GUIDES[toolId];
}
