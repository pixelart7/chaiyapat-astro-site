import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import Icons from 'unplugin-icons/vite';

import remarkObsidian from 'remark-obsidian';
import remarkHeadingShift from 'remark-heading-shift';
import slugify from 'slugify';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [
      remarkHeadingShift,
      () => remarkObsidian({
        titleToUrl: (title) => `/notes/${slugify(title, { lower: true })}`
      },
    )],
    extendDefaultPlugins: true,
  },
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
});