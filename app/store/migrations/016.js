/**
 * Migration 016: Renames NetworkController.properties to NetworkController.networkDetails
 * Updates the NetworkController state structure to use the new networkDetails property name
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with renamed NetworkController property
 */
export default function migrate(state) {
  if (state.engine.backgroundState.NetworkController.properties) {
    state.engine.backgroundState.NetworkController.networkDetails =
      state.engine.backgroundState.NetworkController.properties;
    delete state.engine.backgroundState.NetworkController.properties;
  }
  return state;
}
