import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@image': path.resolve(__dirname, './src/assets/image'),
      '@js': path.resolve(__dirname, './src/assets/js'),
      '@scss': path.resolve(__dirname, './src/assets/scss'),
      '@components': path.resolve(__dirname, './src/components'),
    }
  }
})
