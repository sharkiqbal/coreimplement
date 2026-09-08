// Lightweight, dependency-free spam defenses for public forms:
// - Honeypot: a field hidden from real users but filled in by bots that
//   auto-fill every input they find.
// - Time trap: bots tend to submit instantly; real people take a few seconds
//   to read and fill out a form.
export const HONEYPOT_FIELD = "company_website";
export const MIN_SUBMIT_SECONDS = 3;

export const isLikelySpam = ({ honeypotValue, formLoadedAt }) => {
  if (honeypotValue && honeypotValue.trim() !== "") {
    return true;
  }
  const elapsedSeconds = (Date.now() - formLoadedAt) / 1000;
  return elapsedSeconds < MIN_SUBMIT_SECONDS;
};
