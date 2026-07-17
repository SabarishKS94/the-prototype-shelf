import { defineConfig } from 'vite';
import path from 'path';
import lwc from 'vite-plugin-lwc';

export default defineConfig(({ mode }) => ({
    base:
        mode === 'gh-pages'
            ? './'
            : mode === 'soma-pages'
                ? '/pages/sabarish-ks/the-prototype-shelf/'
                : '/',
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
            disableSyntheticShadowSupport: true,
        }),
    ],
    appType: 'spa',
    server: {
        port: 4400,
        open: false,
    },
}));
