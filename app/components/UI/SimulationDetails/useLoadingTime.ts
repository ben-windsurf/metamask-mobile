import { useState } from 'react';

/**
 * Custom hook for tracking loading time duration
 * Measures the time from hook initialization to when loading is marked complete
 * @returns {Object} Object containing loadingTime in seconds and setLoadingComplete function
 */
export default function useLoadingTime() {
  const [loadingStart] = useState(Date.now());
  const [loadingTime, setLoadingTime] = useState<number | undefined>();

  const setLoadingComplete = () => {
    if (loadingTime === undefined) {
      setLoadingTime((Date.now() - loadingStart) / 1000);
    }
  };
  return { loadingTime, setLoadingComplete };
}
