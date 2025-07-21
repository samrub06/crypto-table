/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = command === 'build' && mode === 'production'
  
  return {
    plugins: [react(), tailwindcss()],
    base: isProduction ? '/weather-app/' : './',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    },
  }
})
