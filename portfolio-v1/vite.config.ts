import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

/**
 * Portfolio V1 — fully isolated Vite app.
 *
 * This config is intentionally self-contained: `root` points at this folder,
 * `build.outDir` writes to portfolio-v1/dist, and nothing here reads or writes
 * anything in the parent application. Dependencies resolve from the repository
 * root node_modules, so no second install is required.
 */
export default defineConfig({
  root: __dirname,
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // 3000 belongs to the existing app's express server; V1 gets its own port.
    port: 5174,
    strictPort: false,
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    target: 'es2022',
  },
});
