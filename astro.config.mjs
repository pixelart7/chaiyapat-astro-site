import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import Icons from 'unplugin-icons/vite';
import remarkObsidian from 'remark-obsidian';
import remarkHeadingShift from 'remark-heading-shift';
import slugify from 'slugify';

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: 'https://chaiyapat.pix7.me/',
  integrations: [tailwind(), svelte()],
  markdown: {
    remarkPlugins: [
    // remarkHeadingShift, // conflict with normal md files
    () => remarkObsidian({
      titleToUrl: title => `/garden/${slugify(title, {
        lower: true
      })}`
    })],
    extendDefaultPlugins: true
  },
  vite: {
    plugins: [Icons({
      compiler: 'astro',
    })]
  }
});