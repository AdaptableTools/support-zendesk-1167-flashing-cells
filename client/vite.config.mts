import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';

import path from 'path';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [react(), checker({ typescript: true, eslint: { lintCommand: 'eslint "src/**/*.+(ts|tsx|html)"' } })],
  resolve: { alias: [{ find: '#', replacement: path.resolve(__dirname, 'src') }] },
});
