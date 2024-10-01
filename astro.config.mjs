// @ts-check
import { defineConfig } from 'astro/config';
import Icons from 'unplugin-icons/vite'
import remarkWikiLink from "@braindb/remark-wiki-link";
import rehypeExternalLinks from "rehype-external-links";
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import remarkFigureCaption from '@microflash/remark-figure-caption'
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';

import { bdb } from "./src/lib/braindb.mjs";

await bdb.ready();

// https://astro.build/config
export default defineConfig({
  site: 'https://chaiyapat.pix7.me/',
  integrations: [tailwind(), svelte()],
  vite: {
    optimizeDeps: {
      exclude: ["fsevents", "@node-rs", "@napi-rs"],
    },
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: " ↗" }, // ⤴
          contentProperties: { "aria-hidden": true, class: "ext-link-select" },
        },
      ],
    ],
    remarkPlugins: [
      remarkFigureCaption,
      [
        remarkWikiLink,
        {
          linkTemplate: ({ slug, alias }) => {
            const [slugWithoutAnchor, anchor] = slug.split("#");
            const doc = bdb.documentsSync({ slug: slugWithoutAnchor })[0];
            const prefix = '/garden'
            if (doc) {
              return {
                hName: "a",
                hProperties: {
                  href: anchor ? `${prefix}${doc.url()}#${anchor}` : `${prefix}${doc.url()}`,
                },
                hChildren: [
                  {
                    type: "text",
                    value: alias == null ? doc.frontmatter().title : alias,
                  },
                ],
              };
            } else {
              return {
                hName: "span",
                hProperties: {
                  class: "broken-link",
                  title: `Can't resolve link to ${slug}`,
                },
                hChildren: [{ type: "text", value: alias || slug }],
              };
            }
          },
        },
      ],
    ],
  },
});