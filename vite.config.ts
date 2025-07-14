import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // ¡CAMBIO CLAVE AQUÍ!
  // Cuando usas un dominio personalizado (ej. oldvalentin.lat),
  // tu sitio se sirve desde la raíz del dominio, no desde el nombre del repositorio.
  base: '/',
  plugins: [react()],
});
