import { captureException } from '@sentry/react-native';
import { isObject } from '@metamask/utils';
import { ensureValidState } from './util';

/**
 * Migration to reset state of TokenBalancesController
 * Resets the contractBalances property to an empty object to clear cached token balance data
 *
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with reset TokenBalancesController contractBalances
 */
export default function migrate(state: unknown) {
  if (!ensureValidState(state, 41)) {
    return state;
  }

  const tokenBalancesControllerState =
    state.engine.backgroundState.TokenBalancesController;

  if (!isObject(tokenBalancesControllerState)) {
    captureException(
      new Error(
        `FATAL ERROR: Migration 41: Invalid TokenBalancesController state error: '${JSON.stringify(
          tokenBalancesControllerState,
        )}'`,
      ),
    );
    return state;
  }

  tokenBalancesControllerState.contractBalances = {};

  return state;
}
