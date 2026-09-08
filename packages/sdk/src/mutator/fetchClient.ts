async function fetchClient<T>(url: string, options: RequestInit): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  let data: unknown;
  if (response.headers.get("content-type")?.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw Object.assign(
      new Error(`Request failed with status ${response.status}`),
      {
        status: response.status,
        data,
      },
    );
  }

  return data as Promise<T>;
}

export { fetchClient };
