import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            src: '/src',
            components: '/src/components',
            pages: '/src/components/pages',
            interface: '/src/components/interface',
            others: '/src/components/others',
            assets: '/src/assets',
            hooks: '/src/hooks',
            services: '/src/services',
            styles: '/src/styles',
        },
    },
});
