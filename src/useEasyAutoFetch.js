import { useEasyCore } from "./useEasyCore";

export function useEasyAutoFetch(url, options = {}) {
  const {
    method = "GET",
    body = null,
    headers = {},
    refresh = null,
    deps = [],
    retry = 0,
  } = options;

  // Internal fetch function
  const fetchFn = async () => {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
  };

  // Pass everything to the core
  return useEasyCore(fetchFn, {
    deps,
    refresh,
    retry,
  });
}
