import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1600, // Increases the warning limit to 1600kb
  },
  worker: {
    format: 'es', // Fuerza a que los workers se empaqueten como módulos ES
    plugins: () => [react()], // Aplica el plugin de React también dentro del worker
  },
});