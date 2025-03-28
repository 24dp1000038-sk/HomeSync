import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 3000,
    proxy:{
      "api": {
        target : "http://127.0.0.1:5000",
        changeOrigin: true,
        headers:{
          Accept : "application/json",
          "Content-Type": "application/json"
        },
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})
