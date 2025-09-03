/**
 * Migration 19: Removes the deprecated 'recents' property from state
 * Cleans up legacy recent transactions data that is no longer used
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with recents property removed
 */
export default function migrate(state) {
  if (state.recents) {
    delete state.recents;
  }
  return state;
}
