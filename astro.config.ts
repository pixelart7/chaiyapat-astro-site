import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import Icons from 'unplugin-icons/vite';
import remarkObsidian from 'remark-obsidian';
import remarkHeadingShift from 'remark-heading-shift';
import remarkBreaks from 'remark-breaks';
import remarkCallouts from 'remark-callouts';
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
    remarkBreaks,
    remarkFigureCaption,
    remarkCallouts,
    () => {
      const mdFileList = getContentMdFileList();

      return remarkObsidian({
        titleToUrl: (title) => {
          const filteredFiles = mdFileList
            .map((mdPath, i) => {
              const splited = mdPath.split('/');
              const filename = splited[splited.length - 1];
              return (filename.includes(title)) ? i : -1;
            }).filter((e) => e !== -1);

          let index = -1;
          if (filteredFiles.length > 1) {
            const filenames = filteredFiles.map((fIndex, i) => ({ filename: mdFileList[fIndex], index: fIndex }))
            filenames.forEach((fn) => {
              const filename = fn.filename.split('/');
              if (filename === title) index === fn.index; // Exact match
              else index = fn.index; // Partial match
            })
          } else {
            index = (filteredFiles.length > 0) ? filteredFiles[0] : -1;
          }

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