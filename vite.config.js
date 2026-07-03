import { defineConfig } from 'vite';
import path from 'path';
import lwc from 'vite-plugin-lwc';

export default defineConfig(({ mode }) => ({
    base: mode === 'gh-pages' ? './' : '/',
    build: {
        outDir: 'dist',
    },
    plugins: [
        lwc({
            modules: [
                {
                    dir: path.resolve('./src/modules'),
                },
            ],
            disableSyntheticShadowSupport: false,
        }),
    ],
    appType: 'spa',
    server: {
        port: 4400,
        open: false,
    },
}));
