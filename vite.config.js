import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    strictPort: true,
    cors: true,
    hmr: {
      clientPort: 443
    },
    allowedHosts: true
  }
})
