import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue({
    appEntrypoint: '/src/pages/vueapp.ts',
    template: {
      transformAssetUrls: {
        includeAbsolute: false,
      }
    },
  })],
  output: "hybrid",
  adapter: node({
    mode: "standole"
  })
});