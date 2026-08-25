export const siteConfig = {
  brand: "Build With AI",
  tagline: "Practical, human-supervised AI products built for real workflows.",
  author: "Pushpendra Singh",
  description:
    "Build With AI is Pushpendra Singh's engineering studio — practical, human-supervised AI products built for real workflows. Flagship project: AI Job Agent.",
  // Optional personal links. Each is rendered only where a real value is
  // configured below — never guessed, inferred, or fabricated. Set to null
  // to hide a link entirely (see src/lib/links.ts's isPublicLink).
  githubUrl: "https://github.com/pushpendra-devera" as string | null,
  linkedinUrl: "https://www.linkedin.com/in/pushpendra-singh-devera/" as
    | string
    | null,
  contactEmail: "pushpendra.devera@gmail.com" as string | null,
  resumeUrl: null as string | null,
  nav: [
    { label: "AI Job Agent", href: "/projects/ai-job-agent" },
    { label: "Demo", href: "/demo/ai-job-agent" },
    { label: "Architecture", href: "/architecture" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export const projects = {
  aiJobAgent: {
    name: "AI Job Agent",
    version: "1.0.0-beta.2",
    // The implementation repository is PRIVATE. This must stay null unless
    // the repo is actually made public — never fabricate or guess a URL.
    // Every page that would otherwise link to source code must render a
    // contextual fallback CTA instead (see src/lib/links.ts's sourceCta).
    sourceUrl: null as string | null,
  },
};
