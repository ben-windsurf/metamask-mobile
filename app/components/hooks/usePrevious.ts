import { useEffect, useRef } from 'react';

/**
 * Custom React hook that returns the previous value of a state variable
 * Useful for comparing current and previous values in components or effects
 * @param {T} state - The current state value to track
 * @returns {T | undefined} The previous value of the state, or undefined on first render
 */
export default function usePrevious<T>(state: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
}
