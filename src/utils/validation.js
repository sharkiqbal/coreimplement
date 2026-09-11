// Simple, permissive email shape check for public form validation.
// Not RFC 5322-complete on purpose - just enough to catch obvious typos
// (missing @, missing domain, stray spaces) without rejecting real addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email) => EMAIL_PATTERN.test(String(email).trim());
