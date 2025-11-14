import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000
    // proxy: {
    //   '/api': {
    //     target: 'https://electriccarmanagement-swp.up.railway.app',
    //     changeOrigin: true,
    //     secure: true,
    //     rewrite: (p) => p.replace(/^\/api/, '')
    //   }
    // }
    // proxy: {
    //   '/api': {
    //     target: 'https://user1758696037954.requestly.tech',
    //     changeOrigin: true,
    //     secure: true,
    //     rewrite: (p) => p.replace(/^\/api/, '')
    //   }
    // }
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
