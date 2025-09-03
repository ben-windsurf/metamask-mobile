/**
 * Migration 017: Resets the network onboarded state
 * Clears the networkOnboardedState object to reset network onboarding status
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state
 */
export default function migrate(state) {
  if (state.networkOnboarded && state.networkOnboarded.networkOnboardedState) {
    state.networkOnboarded.networkOnboardedState = {};
  }
  return state;
}
