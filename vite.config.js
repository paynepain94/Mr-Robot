import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // <-- 1. AÑADE ESTE IMPORT

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // --- 2. AÑADE ESTA SECCIÓN ---
  resolve: {
    alias: {
      // Configura el alias para que "@" apunte a la carpeta "./src"
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // -------------------------------
});

