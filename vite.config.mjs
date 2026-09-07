import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const alias = name => fileURLToPath(new URL(`./src/${name}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  publicDir: 'static',
  resolve: {
    alias: {
      '@components': alias('components'),
      '@config': alias('config.jsx'),
      '@fonts': alias('fonts'),
      '@hooks': alias('hooks'),
      '@images': alias('images'),
      '@pages': alias('pages'),
      '@styles': alias('styles'),
      '@utils': alias('utils'),
      '@content': alias('content.jsx'),
    },
  },
});
