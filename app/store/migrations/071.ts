/**
 * Migration 71: set completedOnboarding based on the state of the KeyringController.
 *
 * This migration ended up never being useful, since `onboarding` was blacklisted in `persistConfig`.
 * We're instead applying the original logic in `useCompletedOnboardingEffect`, called in `app/components/Nav/Main/index.js`.
 */
/**
 * Migration function that passes through the state unchanged.
 * This migration was originally intended to set completedOnboarding based on KeyringController state,
 * but became unnecessary due to onboarding being blacklisted in persistConfig.
 *
 * @param state - The current application state
 * @returns The unchanged state
 */
const migration = (state: unknown): unknown => state;

export default migration;
