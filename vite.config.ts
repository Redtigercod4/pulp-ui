import { linguiMacroSwcPlugin } from "@lingui/swc-plugin/options";
import { lingui } from "@lingui/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type UserConfig } from "vite";

const proxyTarget: string = process.env.API_PROXY || "http://localhost:8080";
const proxyRoutes: string[] = [
	"/api/",
	"/assets/",
	"/auth/",
	"/extensions/",
	"/pulp/",
	"/static/rest_framework",
	"/v2/",
];

export default defineConfig({
	publicDir: "static",
	server: {
		port: 8002,
		proxy: Object.fromEntries(proxyRoutes.map((path) => [path, proxyTarget])),
	},
	resolve: {
		tsconfigPaths: true,
	},
	build: {
		outDir: "dist",
	},
	plugins: [
		react({
			plugins: [linguiMacroSwcPlugin()],
		}),
		lingui(),
	],
}) satisfies UserConfig;
