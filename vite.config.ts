import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import {fileURLToPath, URL} from "node:url";

export default defineConfig({
  plugins: [VueDevTools(), vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/ui', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/index.html'),
        options: resolve(__dirname, 'src/ui/app/index.html'),
        background: resolve(__dirname, `src/background/background.ts`)
      },
      output: {
        entryFileNames: chunk => `${chunk.name}/main.js`,
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})
