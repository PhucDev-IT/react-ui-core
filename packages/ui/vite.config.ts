import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

const externalPackages = [
  'react',
  'react-dom',
  '@tiptap/react',
  '@tiptap/starter-kit',
  '@tiptap/extension-placeholder',
  'jsbarcode',
  'qrcode',
]

const isExternal = (id: string) =>
  externalPackages.some((pkg) => id === pkg || id.startsWith(pkg + '/'))

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'styles',
    },
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      external: isExternal,
    },
  },
})
