import { SecurityAlertResponse } from '../../components/Views/confirmations/legacy/components/BlockaidBanner/BlockaidBanner.types';
import AppConstants from '../../core/AppConstants';

/** API endpoint for validation requests */
const ENDPOINT_VALIDATE = 'validate';

/**
 * Request structure for Security Alerts API calls
 * @interface SecurityAlertsAPIRequest
 * @property method - The RPC method being validated
 * @property params - Array of parameters for the RPC method
 */
export interface SecurityAlertsAPIRequest {
  method: string;
  params: unknown[];
}

/**
 * Checks if the Security Alerts API is enabled via environment variable
 * @returns True if the Security Alerts API is enabled, false otherwise
 */
export function isSecurityAlertsAPIEnabled() {
  return process.env.MM_SECURITY_ALERTS_API_ENABLED === 'true';
}

/**
 * Validates a transaction or request using the Security Alerts API
 * @param chainId - The blockchain chain ID to validate against
 * @param body - The request payload containing method and parameters
 * @returns Promise resolving to the security alert response
 * @throws Error if the API request fails
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

/**
 * Makes an HTTP request to the Security Alerts API
 * @param endpoint - The API endpoint to call
 * @param options - Optional fetch request options
 * @returns Promise resolving to the parsed JSON response
 * @throws Error if the request fails or returns a non-ok status
 */
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

/**
 * Constructs the full URL for a Security Alerts API endpoint
 * @param endpoint - The specific endpoint path
 * @returns The complete URL for the API request
 * @throws Error if the Security Alerts API URL is not configured
 */
function getUrl(endpoint: string) {
  const host = AppConstants.SECURITY_ALERTS_API.URL;

  if (!host) {
    throw new Error('Security alerts API URL is not set');
  }

  return `${host}/${endpoint}`;
}
