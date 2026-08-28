/// <reference types="vitest/config" />

import { linguiMacroSwcPlugin } from "@lingui/swc-plugin/options";
import { lingui } from "@lingui/vite-plugin";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
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
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		react({
			plugins: [linguiMacroSwcPlugin()],
		}),
		lingui(),
	],
	test: {
		environment: "jsdom",
		setupFiles: ["./src/vitest.setup.ts"],
		tags: [
			{
				name: "integration",
				description:
					"ACL client functions tested against MSW-mocked Pulp responses - not a real backend",
			},
			{
				name: "unit",
				description:
					"Pure functions, Zod schemas, and ACL codecs - no network or DOM",
			},
			{
				name: "component",
				description:
					"React components rendered via Testing Library, with API calls mocked via MSW",
			},
		],
		coverage: {
			provider: "v8",
		},
	},
}) satisfies UserConfig;
