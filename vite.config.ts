import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { lingui } from "@lingui/vite-plugin"
import { linguiMacroSwcPlugin } from "@lingui/swc-plugin/options"

const proxyTarget: string = process.env.API_PROXY || 'http://localhost:8080';
const proxyRoutes: string[] = ['/api/', '/assets/', '/auth/', '/extensions/', '/pulp/', '/static/rest_framework', '/v2/'];

export default defineConfig({
    publicDir: 'static',
    server: {
        port: 8002,
        proxy: Object.fromEntries(proxyRoutes.map((path) => [path, proxyTarget]))
    },
    resolve: {
        tsconfigPaths: true
    },
    build: {
        outDir: 'dist'
    },
    plugins: [
        react({
            plugins: [linguiMacroSwcPlugin()]
        }),
        lingui()
    ]
}) satisfies UserConfig;
