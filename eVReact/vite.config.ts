import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 8080
  },
  preview: {
    port: 8080
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    // Khai báo alias cho hằng vite biết
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})
