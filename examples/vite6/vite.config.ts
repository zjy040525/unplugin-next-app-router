import react from '@vitejs/plugin-react-swc'
import NextAppRouter from 'unplugin-next-app-router/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), NextAppRouter()],
})
