/**
 * Migration 022: Migrates openSeaEnabled preference to displayNftMedia and removes deprecated properties
 * Converts the legacy openSeaEnabled setting to the new displayNftMedia preference
 * and cleans up the deprecated nftDetectionDismissed user property
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state
 */
export default function migrate(state) {
  if (state?.engine?.backgroundState?.PreferencesController?.openSeaEnabled) {
    state.engine.backgroundState.PreferencesController.displayNftMedia =
      state.engine.backgroundState.PreferencesController.openSeaEnabled ?? true;

    delete state.engine.backgroundState.PreferencesController.openSeaEnabled;
  }
  if (state?.user?.nftDetectionDismissed) {
    delete state.user.nftDetectionDismissed;
  }

  return state;
}
