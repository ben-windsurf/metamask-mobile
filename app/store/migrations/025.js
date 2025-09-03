import { ETHERSCAN_SUPPORTED_CHAIN_IDS } from '@metamask/preferences-controller';

/**
 * Migration 25: Migrates thirdPartyApiMode from privacy settings to per-chain showIncomingTransactions preferences
 * Updates PreferencesController to use chain-specific incoming transaction settings based on the global thirdPartyApiMode setting
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state
 */
export default function migrate(state) {
  try {
    Object.values(ETHERSCAN_SUPPORTED_CHAIN_IDS).forEach((hexChainId) => {
      const thirdPartyApiMode = state?.privacy?.thirdPartyApiMode ?? true;
      if (
        state?.engine?.backgroundState?.PreferencesController
          ?.showIncomingTransactions
      ) {
        state.engine.backgroundState.PreferencesController.showIncomingTransactions =
          {
            ...state.engine.backgroundState.PreferencesController
              .showIncomingTransactions,
            [hexChainId]: thirdPartyApiMode,
          };
      } else if (state?.engine?.backgroundState?.PreferencesController) {
        state.engine.backgroundState.PreferencesController.showIncomingTransactions =
          { [hexChainId]: thirdPartyApiMode };
      }
    });

    if (state?.privacy?.thirdPartyApiMode !== undefined) {
      delete state.privacy.thirdPartyApiMode;
    }

    return state;
  } catch (e) {
    return state;
  }
}
