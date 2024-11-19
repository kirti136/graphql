import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Vite configuration with React SWC plugin
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Automatically resolve .jsx and .tsx extensions
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  server: {
    open: true, // Automatically open in browser
    port: 3000, // Default port for dev server
  },
})
