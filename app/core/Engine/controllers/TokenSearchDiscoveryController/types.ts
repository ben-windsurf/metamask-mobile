import { TokenSearchDiscoveryControllerMessenger } from '@metamask/token-search-discovery-controller/dist/token-search-discovery-controller.cjs';
import { TokenSearchDiscoveryControllerState } from '@metamask/token-search-discovery-controller';

/**
 * Parameters for initializing the TokenSearchDiscoveryController.
 * @interface TokenSearchDiscoveryControllerParams
 * @property state - Optional partial state to initialize the controller with
 * @property messenger - Controller messenger for inter-controller communication
 */
export interface TokenSearchDiscoveryControllerParams {
  state?: Partial<TokenSearchDiscoveryControllerState>;
  messenger: TokenSearchDiscoveryControllerMessenger;
}
