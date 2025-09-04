import { hasProperty, isObject } from '@metamask/utils';
import { captureException } from '@sentry/react-native';
import { ensureValidState } from './util';

/**
 * Migration 74: Remove `tokens`, `detectedTokens`, and `ignoredTokens` from `TokensController`
 * remove `accounts` from `AccountTrackerController`
 * remove `tokenList` from `TokenListController`
 */

/**
 * Migration 74: Remove deprecated properties from various controllers.
 * Removes `tokens`, `detectedTokens`, and `ignoredTokens` from `TokensController`,
 * removes `accounts` from `AccountTrackerController`, and removes `tokenList` from `TokenListController`.
 *
 * @param state - The current application state to migrate
 * @returns The migrated state with deprecated properties removed
 */
const migration = (state: unknown): unknown => {
  const migrationVersion = 74;

  if (!ensureValidState(state, migrationVersion)) {
    return state;
  }

  try {
    const backgroundState = state?.engine?.backgroundState;

    if (backgroundState) {
      if (
        hasProperty(backgroundState, 'TokensController') &&
        isObject(backgroundState.TokensController)
      ) {
        const tokensController = backgroundState.TokensController;
        delete tokensController.tokens;
        delete tokensController.detectedTokens;
        delete tokensController.ignoredTokens;
      }

      if (
        hasProperty(backgroundState, 'AccountTrackerController') &&
        isObject(backgroundState.AccountTrackerController)
      ) {
        const accountTrackerController =
          backgroundState.AccountTrackerController;
        delete accountTrackerController.accounts;
      }

      if (
        hasProperty(backgroundState, 'TokenListController') &&
        isObject(backgroundState.TokenListController)
      ) {
        const tokenListController = backgroundState.TokenListController;
        delete tokenListController.tokenList;
      }
    }

    return state;
  } catch (error) {
    captureException(
      new Error(`Migration ${migrationVersion} failed: ${error}`),
    );
    return state;
  }
};

export default migration;
