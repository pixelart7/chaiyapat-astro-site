// @ts-check
import { defineConfig } from 'astro/config';
import Icons from 'unplugin-icons/vite'

import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://chaiyapat.pix7.me/',
  integrations: [tailwind(), svelte()],
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
});