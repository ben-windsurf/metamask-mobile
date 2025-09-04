import Logger from '../../../../util/Logger';
import {
  TokenSearchApiService,
  TokenSearchDiscoveryController,
  TokenDiscoveryApiService,
} from '@metamask/token-search-discovery-controller';
import { TokenSearchDiscoveryControllerParams } from './types';
import { PORTFOLIO_API_URL } from './constants';

/**
 * Gets the appropriate Portfolio API base URL based on the current environment.
 *
 * @returns The Portfolio API base URL for the current environment
 */
const getPortfolioApiBaseUrl = () => {
  const env = process.env.METAMASK_ENVIRONMENT;
  switch (env) {
    // TODO: Replace local with dev
    case 'local':
    case 'e2e':
      return PORTFOLIO_API_URL.dev;
    case 'pre-release':
    case 'production':
    case 'beta':
    case 'rc':
    case 'exp':
      return PORTFOLIO_API_URL.prod;
    default:
      return PORTFOLIO_API_URL.dev;
  }
};

/**
 * Creates and configures a TokenSearchDiscoveryController instance with the appropriate API services.
 *
 * @param params - Configuration parameters for the controller
 * @param params.state - Initial state for the controller
 * @param params.messenger - Controller messenger for inter-controller communication
 * @returns A configured TokenSearchDiscoveryController instance
 * @throws Will throw an error if controller creation fails
 */
export const createTokenSearchDiscoveryController = ({
  state,
  messenger,
}: TokenSearchDiscoveryControllerParams) => {
  try {
    const baseUrl = getPortfolioApiBaseUrl();
    const controller = new TokenSearchDiscoveryController({
      state,
      messenger,
      tokenSearchService: new TokenSearchApiService(baseUrl),
      tokenDiscoveryService: new TokenDiscoveryApiService(baseUrl),
    });
    return controller;
  } catch (error) {
    Logger.error(error as Error);
    throw error;
  }
};
