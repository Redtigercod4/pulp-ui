const baseUrl = "http://localhost:8080";

// TODO: Rename to client
async function pulpFetch<T>(url: string, options: RequestInit): Promise<T> {
	// Headers
	const headers = new Headers(options.headers);

	if (options.body !== undefined) {
		headers.set("Content-Type", "application/json");
	}

	// Body

	// Request
	const response = await fetch(`${baseUrl}${url}`, { ...options, headers });

	if (!response.ok) {
		throw Object.assign(
			new Error(`Request failed with status ${response.status}`),
			{
				status: response.status,
				data: await response.json(),
			},
		);
	}

	// return
	return response.json();
}

export { pulpFetch };
