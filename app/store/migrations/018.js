/**
 * Migration 18: Removes deprecated suggestedAssets property from TokensController
 * Cleans up the TokensController state by removing the obsolete suggestedAssets property
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with suggestedAssets removed from TokensController
 */
export default function migrate(state) {
  if (state.engine.backgroundState.TokensController.suggestedAssets) {
    delete state.engine.backgroundState.TokensController.suggestedAssets;
  }
  return state;
}
