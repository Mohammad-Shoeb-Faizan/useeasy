import { useState, useEffect, useRef, useCallback } from "react";

export function useEasyCore(asyncFn, options = {}) {
  const { deps = [], refresh = null, retry = 0 } = options;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Track latest async call to avoid race conditions
  const callIdRef = useRef(0);

  const run = useCallback(async () => {
    const id = ++callIdRef.current;
    setLoading(true);
    setError(null);

    let attempts = retry + 1;

    while (attempts > 0) {
      try {
        const result = await asyncFn();

        // If outdated call → ignore result
        if (id !== callIdRef.current) return;

        setData(result);
        setLoading(false);
        return result;
      } catch (err) {
        attempts--;
        if (attempts === 0) {
          if (id === callIdRef.current) {
            setError(err);
            setLoading(false);
          }
          return;
        }
      }
    }
  }, deps); // Re-run when deps change

  // Run once at start or when deps change
  useEffect(() => {
    run();
  }, deps);

  // Optional auto refresh
  useEffect(() => {
    if (!refresh) return;

    const interval = setInterval(() => {
      run();
    }, refresh);

    return () => clearInterval(interval);
  }, [refresh, run]);

  return { data, error, loading, run };
}
