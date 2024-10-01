// https://astro-digital-garden.stereobooster.com/recipes/braindb/

import { slug as githubSlug } from "github-slugger";
import path from "node:path";
import process from "node:process";
import { BrainDB } from "@braindb/core";

// slug implementation according to Astro
// see astro/packages/astro/src/content/utils.ts
export function generateSlug(filePath) {
  const withoutFileExt = filePath.replace(
    new RegExp(path.extname(filePath) + "$"),
    ""
  );
  const rawSlugSegments = withoutFileExt.split(path.sep);
  const slug = rawSlugSegments
    // Slugify each route segment to handle capitalization and spaces.
    // Note: using `slug` instead of `new Slugger()` means no slug deduping.
    .map((segment) => githubSlug(segment))
    .join("/")
    .replace(/\/index$/, "");

  return slug;
}

export function slugToUrl(slug) {
  if (!slug.startsWith("/")) slug = "/" + slug;
  if (!slug.endsWith("/")) slug = slug + "/";
  return slug;
}

const start = new Date().getTime();

export const bdb = new BrainDB({
  root: path.resolve(process.cwd(), "src/content/garden"),
  url: (filePath, frontmatter) => {
    if (frontmatter.slug !== undefined) return slugToUrl(frontmatter.slug);
    return slugToUrl(generateSlug(filePath));
  },
  git: process.cwd(),
});

bdb.start();