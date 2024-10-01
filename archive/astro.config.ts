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
            for (let i = 0; i < filenames.length; i++) {
              const filenameSplited = filenames[i].filename.split('/');
              const filename = filenameSplited[filenameSplited.length - 1];
              index = filenames[i].index;
              if (filename === title) break;
            }
          } else {
            index = (filteredFiles.length > 0) ? filteredFiles[0] : -1;
          }

          if (index !== -1) {
            const { dir, filename } = helperDirsAndFile(mdFileList[index]);
            return `${generatePathSlug(dir, filename)}`;
          }
          return `${generatePathSlug('', title)}`;
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