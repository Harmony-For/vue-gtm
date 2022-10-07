/// <reference types="vitest" />
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  test: {
    environment: 'jsdom',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@gtm-support/vue2-gtm',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['@gtm-support/core', 'vue', 'vue-router'],
      output: {
        exports: 'named',
      },
    },
    minify: false,
    target: 'node14.6',
  },
});
