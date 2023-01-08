import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import Icons from 'unplugin-icons/vite';
import remarkObsidian from 'remark-obsidian';
import remarkHeadingShift from 'remark-heading-shift';
import remarkFigureCaption from '@microflash/remark-figure-caption'
import slugify from 'slugify';
import { getContentMdFileList, helperDirsAndFile, generatePathSlug } from './src/garden.ts'

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: 'https://chaiyapat.pix7.me/',
  integrations: [tailwind(), svelte()],
  markdown: {
    remarkPlugins: [
    // remarkHeadingShift, // conflict with normal md files
    remarkFigureCaption,
    () => {
      const mdFileList = getContentMdFileList();

      return remarkObsidian({
        titleToUrl: (title) => {
          const index = mdFileList.findIndex(mdPath => mdPath.includes(title));
          if (index !== -1) {
            const { dir, filename } = helperDirsAndFile(mdFileList[index]);
            return `/garden/${generatePathSlug(dir, filename)}`;
          }
          return `/garden/${generatePathSlug('', title)}`;
        }})
      }
    ],
    extendDefaultPlugins: true
  },
  vite: {
    plugins: [Icons({
      compiler: 'astro',
    })]
  }
});