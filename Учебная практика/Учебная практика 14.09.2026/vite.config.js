import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve(import.meta.dirname, 'node_modules/react'),
      'react/jsx-runtime': path.resolve(import.meta.dirname, 'node_modules/react/jsx-runtime.js')
    }
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3000'
    }
  }
});
