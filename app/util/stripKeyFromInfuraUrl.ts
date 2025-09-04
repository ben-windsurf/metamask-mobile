import { INFURA_PROJECT_ID } from '../constants/network';

/**
 * Strips the Infura project ID from an Infura URL endpoint for privacy/security purposes.
 * Removes both placeholder and actual project ID patterns from the URL.
 *
 * @param endpoint - The Infura endpoint URL to strip the key from
 * @returns The modified endpoint URL with the project ID removed, or undefined if input is undefined
 *
 * @example
 * ```typescript
 * const url = 'https://mainnet.infura.io/v3/abc123';
 * const stripped = stripKeyFromInfuraUrl(url);
 * // Returns: 'https://mainnet.infura.io'
 * ```
 */
const stripKeyFromInfuraUrl = (endpoint: string | undefined) => {
  if (!endpoint) return endpoint;

  let modifiedEndpoint = endpoint;

  if (modifiedEndpoint.endsWith('/v3/{infuraProjectId}')) {
    modifiedEndpoint = modifiedEndpoint.replace('/v3/{infuraProjectId}', '');
  } else if (modifiedEndpoint.endsWith(`/v3/${INFURA_PROJECT_ID}`)) {
    modifiedEndpoint = modifiedEndpoint.replace(`/v3/${INFURA_PROJECT_ID}`, '');
  }

  return modifiedEndpoint;
};

export default stripKeyFromInfuraUrl;
