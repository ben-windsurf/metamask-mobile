/**
 * Migration 009: Enable static token list in PreferencesController
 * Sets useStaticTokenList to true to use the static token list instead of dynamic fetching
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state
 */
export default function migrate(state) {
  state.engine.backgroundState.PreferencesController = {
    ...state.engine.backgroundState.PreferencesController,
    useStaticTokenList: true,
  };
  return state;
}
