import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  base: '/launch_site/',
  plugins: [
    ViteImageOptimizer({
      png: {
        quality: 50,
      }
    }),
  ],
})
