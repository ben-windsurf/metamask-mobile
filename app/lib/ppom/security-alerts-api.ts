import { SecurityAlertResponse } from '../../components/Views/confirmations/legacy/components/BlockaidBanner/BlockaidBanner.types';
import AppConstants from '../../core/AppConstants';

const ENDPOINT_VALIDATE = 'validate';

/**
 * Request interface for Security Alerts API calls
 * Used to validate transactions and detect potential security threats
 */
export interface SecurityAlertsAPIRequest {
  method: string;
  params: unknown[];
}

/**
 * Checks if the Security Alerts API is enabled via environment configuration
 * @returns {boolean} True if the security alerts API is enabled, false otherwise
 */
export function isSecurityAlertsAPIEnabled() {
  return process.env.MM_SECURITY_ALERTS_API_ENABLED === 'true';
}

/**
 * Validates a transaction or request using the Security Alerts API
 * Sends transaction data to the security service for threat analysis
 * @param {string} chainId - The blockchain network chain ID
 * @param {SecurityAlertsAPIRequest} body - The request payload containing method and parameters
 * @returns {Promise<SecurityAlertResponse>} Promise resolving to security alert response
 * @throws {Error} When the API request fails or returns an error status
 */
export async function validateWithSecurityAlertsAPI(
  chainId: string,
  body: SecurityAlertsAPIRequest,
): Promise<SecurityAlertResponse> {
  const endpoint = `${ENDPOINT_VALIDATE}/${chainId}`;
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function request(endpoint: string, options?: RequestInit) {
  const url = getUrl(endpoint);

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `Security alerts API request failed with status: ${response.status}`,
    );
  }

  return response.json();
}

function getUrl(endpoint: string) {
  const host = AppConstants.SECURITY_ALERTS_API.URL;

  if (!host) {
    throw new Error('Security alerts API URL is not set');
  }

  return `${host}/${endpoint}`;
}
