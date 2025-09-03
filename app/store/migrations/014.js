/**
 * Migration 014: Renames NetworkController.provider to NetworkController.providerConfig
 * Updates the network controller state structure to use the new providerConfig property name
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state
 */
export default function migrate(state) {
  if (state.engine.backgroundState.NetworkController.provider) {
    state.engine.backgroundState.NetworkController.providerConfig =
      state.engine.backgroundState.NetworkController.provider;
    delete state.engine.backgroundState.NetworkController.provider;
  }

  return state;
}
