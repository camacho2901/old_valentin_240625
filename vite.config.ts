// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // Asegúrate de que siga siendo esto
  plugins: [react()],
});
