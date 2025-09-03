import { captureException } from '@sentry/react-native';
import { hasProperty, isObject } from '@metamask/utils';
import { ensureValidState } from './util';

/**
 * Migration 54: Migrates TokensController state to replace balanceError property with hasBalanceError boolean
 * Converts the balanceError property on tokens to a hasBalanceError boolean flag for cleaner state management
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with updated TokensController token structure
 */
export default function migrate(state: unknown) {
  if (!ensureValidState(state, 54)) {
    // Increment the migration number as appropriate
    return state;
  }

  const tokensControllerState = state.engine.backgroundState.TokensController;
  if (!isObject(tokensControllerState)) {
    captureException(
      new Error(
        `FATAL ERROR: Migration 54: Invalid TokensController state error: '${typeof tokensControllerState}'`,
      ),
    );
    return state;
  }

  if (Array.isArray(tokensControllerState.tokens)) {
    const migratedTokens = tokensControllerState.tokens.map((token) => {
      if (!hasProperty(token, 'balanceError')) {
        return token;
      }
      if (token?.balanceError === null || token?.balanceError === undefined) {
        token.hasBalanceError = false;
      } else {
        token.hasBalanceError = true;
      }
      delete token?.balanceError;
      return token;
    });
    tokensControllerState.tokens = migratedTokens;
  }

  // Return the modified state
  return state;
}
