export type LinkCta = { href: string; label: string };

/**
 * Returns a "view source" CTA only when sourceUrl is a real, configured URL.
 * Never fabricate or guess a URL here — a null sourceUrl means the repository
 * is private, and callers must render a contextual fallback instead
 * (e.g. "Try the interactive demo", "Read the case study").
 */
export function sourceCta(
  sourceUrl: string | null | undefined,
  label = "View source on GitHub",
): LinkCta | null {
  if (!isPublicLink(sourceUrl)) return null;
  return { href: sourceUrl, label };
}

/** True only for a non-empty configured URL — never inferred or fabricated. */
export function isPublicLink(url: string | null | undefined): url is string {
  return typeof url === "string" && url.trim().length > 0;
}
