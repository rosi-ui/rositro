import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  server: {
    port: 8089,
    open: true,
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'Rositro',
      formats: ['es', 'umd']
    }
  }
})
