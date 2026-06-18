/**
 * Lightweight Client-Side SQL formatter.
 * Formats basic select, update, insert, delete queries with indentations and keyword casing.
 */
export function formatSql(sql: string, uppercaseKeywords = true, indentSpaces = 2): string {
  if (!sql.trim()) return "";

  const keywords = new Set([
    "SELECT", "FROM", "WHERE", "JOIN", "LEFT JOIN", "RIGHT JOIN", 
    "INNER JOIN", "OUTER JOIN", "ON", "GROUP BY", "ORDER BY", 
    "HAVING", "LIMIT", "SET", "AND", "OR", "UNION", "VALUES", 
    "INSERT", "UPDATE", "DELETE", "INTO", "AS", "IN", "LIKE", "NOT", "NULL"
  ]);

  const blockKeywords = new Set([
    "SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "HAVING", "LIMIT",
    "INSERT", "UPDATE", "DELETE", "VALUES"
  ]);

  // Clean spacing first
  let clean = sql
    .replace(/\s+/g, " ")
    .replace(/\s*([,()=<>!+*/-])\s*/g, " $1 ")
    .trim();

  // Tokenize query respecting literal strings (single quotes, double quotes, backticks)
  const tokens: string[] = [];
  let currentToken = "";
  let insideQuote = false;
  let quoteChar = "";

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    
    if ((char === "'" || char === '"' || char === "`") && (i === 0 || clean[i-1] !== "\\")) {
      if (!insideQuote) {
        insideQuote = true;
        quoteChar = char;
        if (currentToken) {
          tokens.push(currentToken);
          currentToken = "";
        }
        currentToken += char;
      } else if (char === quoteChar) {
        insideQuote = false;
        currentToken += char;
        tokens.push(currentToken);
        currentToken = "";
      } else {
        currentToken += char;
      }
    } else if (insideQuote) {
      currentToken += char;
    } else if (char === " ") {
      if (currentToken) {
        tokens.push(currentToken);
        currentToken = "";
      }
    } else {
      currentToken += char;
    }
  }
  if (currentToken) {
    tokens.push(currentToken);
  }

  // Format tokens
  let result = "";
  let indent = 0;
  const pad = () => " ".repeat(indent * indentSpaces);

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    const upperToken = token.toUpperCase();

    // Check multi-word keywords
    let checkKeyword = upperToken;
    if (i < tokens.length - 1) {
      const nextUpper = tokens[i+1].toUpperCase();
      const combined = `${upperToken} ${nextUpper}`;
      if (
        combined === "LEFT JOIN" || 
        combined === "RIGHT JOIN" || 
        combined === "INNER JOIN" || 
        combined === "GROUP BY" || 
        combined === "ORDER BY" ||
        combined === "INSERT INTO"
      ) {
        checkKeyword = combined;
        token = combined;
        i++; // Skip the next token since we combined them
      }
    }

    const isKeyword = keywords.has(checkKeyword);
    const formattedToken = isKeyword 
      ? (uppercaseKeywords ? checkKeyword : checkKeyword.toLowerCase()) 
      : token;

    if (blockKeywords.has(checkKeyword)) {
      if (result) result += "\n";
      result += pad() + formattedToken;
    } else if (
      checkKeyword === "JOIN" || 
      checkKeyword === "LEFT JOIN" || 
      checkKeyword === "RIGHT JOIN" || 
      checkKeyword === "INNER JOIN"
    ) {
      if (result) result += "\n";
      result += pad() + "  " + formattedToken;
    } else if (checkKeyword === "AND" || checkKeyword === "OR") {
      if (result) result += "\n";
      result += pad() + "    " + formattedToken;
    } else if (formattedToken === ",") {
      result += ",\n" + pad() + "  ";
    } else {
      if (result && !result.endsWith("\n") && !result.endsWith(" ") && !result.endsWith("(")) {
        result += " ";
      }
      result += formattedToken;
    }
  }

  // Cleanup formatting relics (like spacing on joins, parentheses, and dots)
  return result
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+\n/g, "\n")
    .replace(/\s*\.\s*/g, ".")
    .replace(/\s*,\s*\n/g, ",\n")
    .replace(/\s*\(\s*/g, " (")
    .replace(/\s*\)\s*/g, ")")
    .replace(/\s*=\s*/g, " = ")
    .replace(/\s*>\s*/g, " > ")
    .replace(/\s*<\s*/g, " < ")
    .trim();
}
