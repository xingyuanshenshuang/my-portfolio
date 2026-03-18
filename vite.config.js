import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 项目站点需要设置 base 路径
  base: '/my-portfolio/',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  assetsInclude: ['**/*.md'],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 highlight.js 分割到单独的 chunk
          'highlight-vendor': ['highlight.js'],
          // 将 Vue 相关库分割到单独的 chunk
          'vue-vendor': ['vue', 'vue-router', 'pinia']
        }
      }
    }
  }
})
