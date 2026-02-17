import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));
const version = pkg.version;

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'unity_test_mf',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/Widget.vue',
      },
      shared: ['vue'],
    }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  build: {
    target: 'es2022',
  },
});
