import type {
  SecurityAlertResponse,
  TransactionMeta,
} from '@metamask/transaction-controller';

import Engine from '../../core/Engine';
import { ResultType } from '../../components/Views/confirmations/legacy/components/BlockaidBanner/BlockaidBanner.types';

interface TransactionSecurityAlertResponseType {
  securityAlertResponses: Record<string, SecurityAlertResponse>;
}

export type TransactionType = TransactionMeta &
  TransactionSecurityAlertResponseType;

/**
 * Checks if Blockaid security alerts are enabled in user preferences
 * @returns {boolean} True if security alerts are enabled, false otherwise
 */
export const isBlockaidPreferenceEnabled = (): boolean => {
  const { PreferencesController } = Engine.context;
  return PreferencesController.state.securityAlertsEnabled;
};

/**
 * Checks if Blockaid security feature is enabled
 * Currently delegates to preference check but can be extended for additional feature flags
 * @returns {Promise<boolean>} Promise resolving to true if Blockaid feature is enabled
 */
export const isBlockaidFeatureEnabled = async (): Promise<boolean> =>
  isBlockaidPreferenceEnabled();

/**
 * Extracts metrics parameters from a Blockaid security alert response
 * @param {SecurityAlertResponse} securityAlertResponse - The security alert response from Blockaid
 * @returns {Record<string, unknown>} Object containing metrics parameters for analytics
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
 * Extracts Blockaid metrics parameters from a transaction object
 * @param {TransactionType} transaction - Transaction object containing security alert responses
 * @returns {Record<string, unknown>} Object containing Blockaid metrics parameters for the transaction
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
