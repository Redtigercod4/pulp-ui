import {
	defineConfig,
	devices,
	type PlaywrightTestConfig,
} from "@playwright/test";

export default defineConfig({
	testDir: "./playwright",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		baseURL: "http://localhost:8002",
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},

		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
	],
	webServer: {
		command: "pnpm run dev",
		url: "http://localhost:8002",
		reuseExistingServer: !process.env.CI,
	},
}) satisfies PlaywrightTestConfig;
