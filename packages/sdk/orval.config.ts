import { defineConfig } from "orval";

export default defineConfig({
	core: {
		input: {
			target: "./src/spec/openapi-3.112.0.json",
			filters: {
				mode: "include",
				tags: ["Status"],
			},
		},
		output: {
			client: "fetch",
			mode: "tags-split",
			target: "./src/core/core.ts",
			schemas: "./src/core/models",
		},
	},
});
