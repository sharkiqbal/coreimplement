// Convert a string into a URL-safe slug (e.g. "AI-Powered Marketing & Growth" -> "ai-powered-marketing-growth")
export const slugify = (text) => {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};
