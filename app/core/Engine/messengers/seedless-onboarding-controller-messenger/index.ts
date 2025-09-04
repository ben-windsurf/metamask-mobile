import { BaseControllerMessenger } from '../../types';

/**
 * Type definition for the SeedlessOnboardingController messenger.
 * Provides restricted access to controller events and actions for seedless onboarding functionality.
 */
export type SeedlessOnboardingControllerMessenger = ReturnType<
  typeof getSeedlessOnboardingControllerMessenger
>;

/**
 * Get the SeedlessOnboardingControllerMessenger for the SeedlessOnboardingController.
 *
 * @param baseControllerMessenger - The base controller messenger.
 * @returns The SeedlessOnboardingControllerMessenger.
 */
export function getSeedlessOnboardingControllerMessenger(
  baseControllerMessenger: BaseControllerMessenger,
) {
  return baseControllerMessenger.getRestricted({
    name: 'SeedlessOnboardingController',
    allowedEvents: ['KeyringController:lock', 'KeyringController:unlock'],
    allowedActions: [],
  });
}
