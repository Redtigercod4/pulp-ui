import { defineConfig } from "orval";

export default defineConfig({
	core: {
		input: {
			target: "./openapi-3.112.0.json",
			filters: {
				mode: "include",
				tags: ["Status"],
			},
		},
		output: {
			client: "fetch",
			mode: "tags-split",
			target: "./src/core/core.ts",
			schemas: { path: "./src/core/models", splitByTags: true },
			override: {
				mutator: {
					path: "./src/lib/fetch.ts",
					name: "pulpFetch",
				},
				fetch: {
					includeHttpResponseReturnType: true,
				},
			},
		},
	},
});
