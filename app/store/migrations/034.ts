import { captureException } from '@sentry/react-native';
import { isObject, hasProperty } from '@metamask/utils';

/**
 * Network state interface for migration 034.
 * Defines the structure of NetworkController state with provider configuration.
 */
interface NetworkState {
  /** Provider configuration for the network */
  providerConfig: {
    /** Chain ID of the network */
    chainId: string;
    /** Ticker symbol for the network's native currency */
    ticker: string;
    /** Type of the network provider */
    type: string;
    /** RPC preferences for the network */
    rpcPrefs: {
      /** URL of the block explorer for this network */
      blockExplorerUrl: string;
    };
  };
  /** ID of the currently selected network client */
  selectedNetworkClientId: string;
}

/**
 * This migration addresses the ticker be required
 * if it is not defined for the current network it will add the value ETH
 * @param {unknown} state - Redux state.
 * @returns Migrated Redux state.
 */
export default async function migrate(stateAsync: unknown) {
  const state = await stateAsync;

  if (!isObject(state)) {
    captureException(
      new Error(`Migration 34: Invalid root state: '${typeof state}'`),
    );
    return state;
  }

  if (!isObject(state.engine)) {
    captureException(
      new Error(
        `Migration 34: Invalid root engine state: '${typeof state.engine}'`,
      ),
    );
    return state;
  }

  if (!isObject(state.engine.backgroundState)) {
    captureException(
      new Error(
        `Migration 34: Invalid root engine backgroundState: '${typeof state
          .engine.backgroundState}'`,
      ),
    );
    return state;
  }

  const networkControllerState = state.engine.backgroundState.NetworkController;
  const newNetworkControllerState = state.engine.backgroundState
    .NetworkController as NetworkState;

  if (!isObject(networkControllerState)) {
    captureException(
      new Error(
        `Migration 34: Invalid NetworkController state: '${typeof networkControllerState}'`,
      ),
    );
    return state;
  }

  if (
    !hasProperty(networkControllerState, 'providerConfig') ||
    !isObject(networkControllerState.providerConfig)
  ) {
    captureException(
      new Error(
        `Migration 34: Invalid NetworkController providerConfig: '${typeof networkControllerState.providerConfig}'`,
      ),
    );
    return state;
  }

  if (!networkControllerState.providerConfig.ticker) {
    newNetworkControllerState.providerConfig.ticker = 'ETH';
  }

  return state;
}
