import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
preview: {
  host: true,
  port: Number(process.env.PORT) || 4173,
  allowedHosts: ['invitacion-mariana.onrender.com'],
},
})
