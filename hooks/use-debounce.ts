import { useState, useEffect } from "react";

const DEFAULT_CONFIG = {
  delay: 500,
};

export const useDebounce = <T>(
  value: T,
  delay: number = DEFAULT_CONFIG.delay
): T => {
  const [debouncedState, setDebouncedState] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedState(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedState;
};
