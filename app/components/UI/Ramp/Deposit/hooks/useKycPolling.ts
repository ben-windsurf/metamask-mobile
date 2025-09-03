import { useEffect, useRef, useCallback, useState } from 'react';
import { useDepositSdkMethod } from './useDepositSdkMethod';
import { BuyQuote } from '@consensys/native-ramps-sdk';

export interface KycPollingResult {
  kycApproved: boolean;
  loading: boolean;
  error: string | null;
  startPolling: () => void;
  stopPolling: () => void;
}

/**
 * Custom hook for polling KYC (Know Your Customer) status during deposit flow
 * Automatically polls the KYC forms endpoint to check if user is approved to place orders
 * @param quote - The buy quote object containing deposit information
 * @param pollingInterval - Interval between polling requests in milliseconds (default: 10000)
 * @param autoStart - Whether to start polling automatically on mount (default: true)
 * @param maxPollingAttempts - Maximum number of polling attempts before stopping (default: 30)
 * @returns Object containing KYC approval status, loading state, error, and control functions
 */
const useKycPolling = (
  quote: BuyQuote,
  pollingInterval: number = 10000,
  autoStart: boolean = true,
  maxPollingAttempts: number = 30,
): KycPollingResult => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollCountRef = useRef<number>(0);
  const [pollingError, setPollingError] = useState<string | null>(null);

  const [
    { data: kycForms, error: sdkError, isFetching: loading },
    fetchKycForms,
  ] = useDepositSdkMethod(
    {
      method: 'getKYCForms',
      onMount: false,
    },
    quote,
  );

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startPolling = useCallback(() => {
    stopPolling();
    pollCountRef.current = 0;
    setPollingError(null);

    // Call immediately
    fetchKycForms();
    pollCountRef.current += 1;

    // Set up interval
    intervalRef.current = setInterval(() => {
      pollCountRef.current += 1;

      if (pollCountRef.current > maxPollingAttempts) {
        setPollingError(
          'KYC polling reached maximum attempts. Please try again later.',
        );
        stopPolling();
        return;
      }

      fetchKycForms();
    }, pollingInterval);
  }, [fetchKycForms, pollingInterval, stopPolling, maxPollingAttempts]);

  useEffect(() => {
    if (kycForms?.isAllowedToPlaceOrder) {
      stopPolling();
    }
  }, [kycForms?.isAllowedToPlaceOrder, stopPolling]);

  useEffect(() => {
    if (autoStart) {
      startPolling();
    }

    return () => {
      stopPolling();
    };
  }, [autoStart, startPolling, stopPolling]);

  return {
    kycApproved: kycForms?.isAllowedToPlaceOrder ?? false,
    loading,
    error: pollingError || sdkError,
    startPolling,
    stopPolling,
  };
};

export default useKycPolling;
