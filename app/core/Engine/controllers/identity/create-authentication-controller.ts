import {
  AuthenticationControllerMessenger,
  AuthenticationControllerState,
  Controller as AuthenticationController,
} from '@metamask/profile-sync-controller/auth';

/**
 * Creates and configures an AuthenticationController instance for managing user authentication
 * and profile synchronization in the MetaMask mobile application.
 *
 * @param props - Configuration object for the authentication controller
 * @param props.messenger - The controller messenger for inter-controller communication
 * @param props.initialState - Optional initial state for the authentication controller
 * @param props.metametrics - MetaMetrics instance for tracking authentication events
 * @returns A configured AuthenticationController instance
 */
export const createAuthenticationController = (props: {
  messenger: AuthenticationControllerMessenger;
  initialState?: AuthenticationControllerState;
  metametrics: ConstructorParameters<
    typeof AuthenticationController
  >['0']['metametrics'];
}): AuthenticationController => {
  const authenticationController = new AuthenticationController({
    messenger: props.messenger,
    state: props.initialState,
    metametrics: props.metametrics,
  });
  return authenticationController;
};
