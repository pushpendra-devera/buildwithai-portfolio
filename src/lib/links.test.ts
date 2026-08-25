import { describe, expect, it } from "vitest";
import { isPublicLink, sourceCta } from "./links";

describe("isPublicLink", () => {
  it("is false for null", () => {
    expect(isPublicLink(null)).toBe(false);
  });

  it("is false for undefined", () => {
    expect(isPublicLink(undefined)).toBe(false);
  });

  it("is false for an empty or whitespace-only string", () => {
    expect(isPublicLink("")).toBe(false);
    expect(isPublicLink("   ")).toBe(false);
  });

  it("is true for a real URL", () => {
    expect(isPublicLink("https://github.com/example/example")).toBe(true);
  });
});

describe("sourceCta", () => {
  it("returns null when the source is private (null)", () => {
    expect(sourceCta(null)).toBeNull();
  });

  it("returns null when the source is unset (undefined)", () => {
    expect(sourceCta(undefined)).toBeNull();
  });

  it("returns null for an empty string, never fabricating a link", () => {
    expect(sourceCta("")).toBeNull();
  });

  it("returns a CTA object for a real, configured URL", () => {
    expect(sourceCta("https://github.com/example/example")).toEqual({
      href: "https://github.com/example/example",
      label: "View source on GitHub",
    });
  });

  it("accepts a custom label", () => {
    expect(sourceCta("https://github.com/example/example", "Source")).toEqual(
      {
        href: "https://github.com/example/example",
        label: "Source",
      },
    );
  });
});
