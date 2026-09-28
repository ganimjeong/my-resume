import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { existsSync } from 'node:fs'

// public/CNAME 이 있으면 커스텀 도메인(루트) 배포, 없으면 ganimjeong.github.io/my-resume/ 배포
const hasCustomDomain = existsSync(fileURLToPath(new URL('public/CNAME', import.meta.url)))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: hasCustomDomain ? '/' : '/my-resume/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      '@images': fileURLToPath(new URL('images', import.meta.url)),
    },
  },
})
