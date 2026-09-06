import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { pulpFetch } from "./fetch";

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Integration: pulpFetch", { tags: ["integration"] }, () => {
	it("resolves with the parsed JSON body on a 2xx response", async () => {
		server.use(
			http.get("http://localhost:8080/pulp/api/v3/status/", () =>
				HttpResponse.json({ version: [] }),
			),
		);

		const result = await pulpFetch("/pulp/api/v3/status/", { method: "GET" });

		expect(result).toStrictEqual({ version: [] });
	});

	it("throws error carrying the status and parsed body on a non-2xx response", async () => {
		server.use(
			http.get("http://localhost:8080/pulp/api/v3/status/", () =>
				HttpResponse.json({ detail: "Not found." }, { status: 404 }),
			),
		);

		await expect(
			pulpFetch("/pulp/api/v3/status/", { method: "GET" }),
		).rejects.toMatchObject({
			status: 404,
			data: { detail: "Not found." },
		});
	});

	it("sets Content-Type: application/json when a body is present and none is set", async () => {
		let contentType: string | null = null;
		server.use(
			http.post(
				"http://localhost:8080/pulp/api/v3/repositories",
				async ({ request }) => {
					contentType = request.headers.get("content-type");
					return HttpResponse.json({});
				},
			),
		);

		await pulpFetch("/pulp/api/v3/repositories/", {
			method: "POST",
			body: JSON.stringify({ name: "test" }),
		});

		expect(contentType).toStrictEqual("application/json");
	});
});
