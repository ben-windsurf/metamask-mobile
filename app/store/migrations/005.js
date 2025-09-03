/**
 * Migration 005: Splits AssetsController into separate TokensController and CollectiblesController
 * Migrates token and collectible data from the legacy AssetsController to the new dedicated controllers
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with separated controllers
 */
export default function migrate(state) {
  state.engine.backgroundState.TokensController = {
    allTokens: state.engine.backgroundState.AssetsController.allTokens,
    ignoredTokens: state.engine.backgroundState.AssetsController.ignoredTokens,
  };

  state.engine.backgroundState.CollectiblesController = {
    allCollectibles:
      state.engine.backgroundState.AssetsController.allCollectibles,
    allCollectibleContracts:
      state.engine.backgroundState.AssetsController.allCollectibleContracts,
    ignoredCollectibles:
      state.engine.backgroundState.AssetsController.ignoredCollectibles,
  };

  delete state.engine.backgroundState.AssetsController;

  return state;
}
