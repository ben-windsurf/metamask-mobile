import { SecurityAlertResponse } from '@metamask/transaction-controller';
import { RootState } from '../../../../reducers';

/**
 * Selector that retrieves the security alert response for signature requests
 * Used in confirmation flows to display security warnings and threat analysis
 * @param {RootState} rootState - The Redux root state containing signature request data
 * @returns {{ securityAlertResponse: SecurityAlertResponse }} Object containing the security alert response
 */
export const selectSignatureSecurityAlertResponse = (
  rootState: RootState,
): { securityAlertResponse: SecurityAlertResponse } =>
  rootState.signatureRequest;
