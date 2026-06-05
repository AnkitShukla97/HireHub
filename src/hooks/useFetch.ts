import { useEffect, useState, useRef } from 'react';

/**
 * Generic result type for useFetch hook
 * @template T - The type of data being fetched
 */
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Generic hook for fetching data with AbortController support
 * Automatically cancels fetch on component unmount or dependency changes to prevent memory leaks
 * 
 * @template T - The type of data being fetched
 * @param url - The URL to fetch from
 * @param options - Optional fetch options (headers, method, etc.)
 * @returns {UseFetchResult<T>} Object containing data, loading state, and error
 * 
 * @example
 * const { data: jobs, loading, error } = useFetch<Job[]>('/api/jobs');
 */
export const useFetch = <T,>(
  url: string,
  options?: RequestInit
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use ref to store AbortController instance
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Create new AbortController for this fetch request
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...options,
          signal, // Pass abort signal to fetch
        });

        // Check if response is ok (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Parse and type the response data
        const result = (await response.json()) as T;
        setData(result);
      } catch (err) {
        // Only set error if request was not aborted
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            // Request was cancelled, don't set error state
            return;
          }
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function: abort the fetch request when component unmounts or dependencies change
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url, options]); // Re-run when URL or options change

  return { data, loading, error };
};
