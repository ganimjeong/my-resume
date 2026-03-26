import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/my-resume/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      '@images': fileURLToPath(new URL('images', import.meta.url)),
    },
  },
})
