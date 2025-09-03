import {
  AuthenticationControllerMessenger,
  AuthenticationControllerState,
  Controller as AuthenticationController,
} from '@metamask/profile-sync-controller/auth';

/**
 * Creates and configures an AuthenticationController instance for MetaMask Mobile
 * This controller manages user authentication state and profile synchronization
 * @param {Object} props - Configuration properties for the authentication controller
 * @param {AuthenticationControllerMessenger} props.messenger - Controller messenger for communication
 * @param {AuthenticationControllerState} [props.initialState] - Optional initial state for the controller
 * @param {Object} props.metametrics - MetaMetrics instance for tracking authentication events
 * @returns {AuthenticationController} Configured authentication controller instance
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
