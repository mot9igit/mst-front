import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/rest': {
        target: 'https://a.dev.mst.tools/',
        changeOrigin: true,
        // rewrite: (path) => path.replace('^/rest', ''),
        secure: true,
      },
    },
  },
})
