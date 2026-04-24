import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const useProxy = process.env.VITE_USE_PROXY === 'true'
const apiTarget = process.env.VITE_API_TARGET || 'http://localhost:8001'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: useProxy
    ? {
        proxy: {
          '/api': {
            target: apiTarget,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      }
    : {},
})
