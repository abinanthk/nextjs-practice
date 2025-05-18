import { useState } from "react";
import { useDebounce } from "./use-debounce";

export const useDebouncedState = <T>(
  initialValue?: T,
  delay?: number
): [T | undefined, (value: T | undefined) => void, T | undefined] => {
  const [state, setState] = useState(initialValue);
  const debouncedState = useDebounce(state, delay);

  return [state, setState, debouncedState];
};
