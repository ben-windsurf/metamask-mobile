import { useSelector } from 'react-redux';

import { selectSignatureSecurityAlertResponse } from '../../selectors/security-alerts';
import { useTransactionMetadataRequest } from '../transactions/useTransactionMetadataRequest';

/**
 * Custom hook that retrieves security alert responses for confirmations
 * Combines transaction metadata security alerts with signature security alerts
 * Used in confirmation flows to display security warnings and threat analysis
 * @returns {Object} Object containing the security alert response data
 */
export function useSecurityAlertResponse() {
  const transactionMetadata = useTransactionMetadataRequest();

  const { securityAlertResponse: signatureSecurityAlertResponse } = useSelector(
    selectSignatureSecurityAlertResponse,
  );

  return {
    securityAlertResponse:
      transactionMetadata?.securityAlertResponse ??
      signatureSecurityAlertResponse,
  };
}
