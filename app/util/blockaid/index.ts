import type {
  SecurityAlertResponse,
  TransactionMeta,
} from '@metamask/transaction-controller';

import Engine from '../../core/Engine';
import { ResultType } from '../../components/Views/confirmations/legacy/components/BlockaidBanner/BlockaidBanner.types';

/**
 * Interface for transaction security alert response data.
 * @interface TransactionSecurityAlertResponseType
 * @property securityAlertResponses - Map of transaction IDs to their security alert responses
 */
interface TransactionSecurityAlertResponseType {
  securityAlertResponses: Record<string, SecurityAlertResponse>;
}

/**
 * Combined transaction type that includes both transaction metadata and security alert responses.
 * Extends TransactionMeta with security alert response data for Blockaid integration.
 */
export type TransactionType = TransactionMeta &
  TransactionSecurityAlertResponseType;

/**
 * Checks if Blockaid security alerts are enabled in user preferences.
 * @returns True if security alerts are enabled in preferences, false otherwise
 */
export const isBlockaidPreferenceEnabled = (): boolean => {
  const { PreferencesController } = Engine.context;
  return PreferencesController.state.securityAlertsEnabled;
};

/**
 * Checks if Blockaid security feature is enabled.
 * Currently delegates to preference check but can be extended for additional feature flags.
 * @returns Promise that resolves to true if Blockaid feature is enabled, false otherwise
 */
export const isBlockaidFeatureEnabled = async (): Promise<boolean> =>
  isBlockaidPreferenceEnabled();

/**
 * Extracts metrics parameters from a Blockaid security alert response.
 * Transforms security alert data into metrics format for analytics tracking.
 * @param securityAlertResponse - Optional security alert response from Blockaid
 * @returns Object containing formatted metrics parameters for tracking
 */
export const getBlockaidMetricsParams = (
  securityAlertResponse?: SecurityAlertResponse,
): Record<string, unknown> => {
  const additionalParams: Record<string, unknown> = {};

  if (securityAlertResponse) {
    const { result_type, reason, providerRequestsCount, source } =
      securityAlertResponse as SecurityAlertResponse & { source: string };

    additionalParams.security_alert_response = result_type;
    additionalParams.security_alert_reason = reason;
    additionalParams.security_alert_source = source;

    if (result_type === ResultType.Malicious) {
      additionalParams.ui_customizations = ['flagged_as_malicious'];
    } else if (result_type === ResultType.RequestInProgress) {
      additionalParams.ui_customizations = ['security_alert_loading'];
      additionalParams.security_alert_response = 'loading';
    }

    // add counts of each RPC call
    if (providerRequestsCount) {
      Object.keys(providerRequestsCount).forEach((key: string) => {
        const metricKey = `ppom_${key}_count`;
        additionalParams[metricKey] = providerRequestsCount[key];
      });
    }
  }

  return additionalParams;
};

/**
 * Extracts Blockaid metrics parameters from a transaction object.
 * Retrieves security alert response for the transaction and formats it for metrics.
 * @param transaction - Transaction object containing security alert responses
 * @returns Object containing formatted Blockaid metrics parameters, empty object if no transaction or security response
 */
export const getBlockaidTransactionMetricsParams = (
  transaction: TransactionType,
): Record<string, unknown> => {
  let blockaidParams = {};

  if (!transaction) {
    return blockaidParams;
  }

  const { securityAlertResponses, id } = transaction;
  const securityAlertResponse = securityAlertResponses?.[id];
  if (securityAlertResponse) {
    blockaidParams = getBlockaidMetricsParams(securityAlertResponse);
  }

  return blockaidParams;
};
