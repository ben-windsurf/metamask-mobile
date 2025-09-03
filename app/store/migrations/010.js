/**
 * Migration 010: Disables collectible detection and OpenSea integration
 * Sets useCollectibleDetection and openSeaEnabled to false in PreferencesController
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state
 */
export default function migrate(state) {
  state.engine.backgroundState.PreferencesController = {
    ...state.engine.backgroundState.PreferencesController,
    useCollectibleDetection: false,
    openSeaEnabled: false,
  };
  return state;
}
