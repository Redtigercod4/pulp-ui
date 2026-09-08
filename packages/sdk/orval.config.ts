import { defineConfig } from "orval";

export default defineConfig({
	core: {
		input: {
			target: "http://localhost:8080/pulp/api/v3/docs/api.json?pk_path=1",
			filters: {
				mode: "include",
				tags: ["Status", "Login", "Tasks", "Users", "Groups", "Roles"],
			},
		},
		output: {
			client: "fetch",
			mode: "tags-split",
			target: "./src/core/core.ts",
			schemas: { path: "./src/core/models", splitByTags: true },
			indexFiles: false,
			override: {
				mutator: {
					path: "./src/mutator/pulpFetch.ts",
					name: "pulpFetch",
				},
				fetch: {
					includeHttpResponseReturnType: false,
				},
			},
		},
	},
});
