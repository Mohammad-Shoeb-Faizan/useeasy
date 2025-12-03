import { useEasyCore } from "./useEasyCore";

export function useEasyFetch(url, options = {}) {
  const { method = "GET", body = null, headers = {} } = options;

  // Create the async function that fetches data
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

  // Pass to core
  const { data, error, loading, run } = useEasyCore(fetchFn, options);

  // expose refetch alias
  return { data, error, loading, refetch: run };
}
