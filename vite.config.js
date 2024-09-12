import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expose the server to the local network
    port: 3000, // Default port, you can change if needed
    strictPort: true, // Ensures Vite will use the specified port or fail if it's in use
  },
});
  