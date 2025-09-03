/**
 * Migration 011: Enables token detection in PreferencesController
 * Sets useTokenDetection to true to automatically detect and display tokens
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with token detection enabled
 */
export default function migrate(state) {
  state.engine.backgroundState.PreferencesController = {
    ...state.engine.backgroundState.PreferencesController,
    useTokenDetection: true,
  };
  return state;
}
