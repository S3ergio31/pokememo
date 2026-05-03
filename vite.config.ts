import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const src = (dir: string) => fileURLToPath(new URL(`./src/${dir}`, import.meta.url));

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      App:        src('App'),
      components: src('components'),
      context:    src('context'),
      css:        src('css'),
      hooks:      src('hooks'),
      ico:        src('ico'),
      lib:        src('lib'),
      state:      src('state'),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
