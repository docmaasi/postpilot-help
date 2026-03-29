import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  envDir: '../../',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui': path.resolve(__dirname, '../../packages/ui/src'),
      'convex/_generated': path.resolve(__dirname, '../../convex/_generated'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-backend': ['convex', 'convex/react'],
          'vendor-charts': ['recharts'],
          'vendor-animation': ['framer-motion'],
          'vendor-dates': ['date-fns'],
          'vendor-forms': ['react-hook-form'],
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
