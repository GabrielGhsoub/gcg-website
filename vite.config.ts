import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin, PreviewServer, ViteDevServer } from 'vite'

type NextFunction = () => void

function redirectProjectBase(req: IncomingMessage, res: ServerResponse, next: NextFunction) {
  if (req.url === '/gcg-website') {
    res.statusCode = 308
    res.setHeader('Location', '/gcg-website/')
    res.end()
    return
  }

  next()
}

function baseRedirectPlugin(): Plugin {
  return {
    name: 'gcg-base-redirect',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(redirectProjectBase)
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use(redirectProjectBase)
    },
  }
}

export default defineConfig({
  plugins: [baseRedirectPlugin(), react(), tailwindcss()],
  base: '/gcg-website/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@config': path.resolve(__dirname, 'src/config'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-router')
          ) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'
          }
        },
      },
    },
  },
})
