import { useCallback, useState } from "react";

export function useUrlQuery<T>(key: string, defaultValue: T) {
  const searchParams = new URLSearchParams(window.location.search); // this shouldn't be memoized

  const [query, setQueryState] = useState<T>(() => {
    try {
      let storedValue = searchParams.get(key);
      if (storedValue != null) return JSON.parse(storedValue) as T;
    } catch (error) {}

    return defaultValue;
  });

  const setQuery = useCallback(
    (value: T | ((prev: T) => T)) => {
      const searchParams = new URLSearchParams(window.location.search); // this shouldn't be memoized

      // Call if it's a function
      if (typeof value === "function") {
        value = (value as Function)(query);
      }

      searchParams.set(key, JSON.stringify(value));

      // Sorting the search params to avoid re-ordering
      searchParams.sort();

      window.history.replaceState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
      return setQueryState(value);
    },
    [key, query]
  );

  const removeQuery = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search); // this shouldn't be memoized

    searchParams.delete(key);
  }, []);

  return [query, setQuery, removeQuery] as const;
}
