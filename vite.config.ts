import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'node:path';

// mode "preview" gera um único HTML (HashRouter) para prévia hospedada.
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'preview' ? [viteSingleFile()] : [])],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: {
    outDir: mode === 'preview' ? 'dist-preview' : 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions:
      mode === 'preview'
        ? {}
        : {
            output: {
              manualChunks: {
                react: ['react', 'react-dom', 'react-router-dom'],
                gsap: ['gsap', '@gsap/react'],
              },
            },
          },
  },
}));
