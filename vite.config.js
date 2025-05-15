import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';                 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {                           
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: 'localhost',
    port: 3000,
    hmr: {
      host: 'petcare.local' 
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
