import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  
  base: '/old_valentin_240625/', // 👈 importante: usa el nombre EXACTO de tu repositorio
  plugins: [react()],
});