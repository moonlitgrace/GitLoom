import { useEffect, useState } from 'react';

/**
 * Custom hook to return debounced value with delay.
 *
 * @param value - Initial value which can be debounced.
 * @param delay - Debounce delay.
 */
export default function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
