import {
  UserStorageControllerMessenger,
  UserStorageControllerState,
  Controller as UserStorageController,
} from '@metamask/profile-sync-controller/user-storage';
import type { TraceCallback } from '@metamask/controller-utils';

/**
 * Creates and configures a UserStorageController instance for managing user data storage
 * in MetaMask Mobile. This controller handles encrypted user data synchronization and storage
 * across devices using the profile sync infrastructure.
 * @param {Object} props - Configuration properties for the user storage controller
 * @param {UserStorageControllerMessenger} props.messenger - Controller messenger for communication
 * @param {UserStorageControllerState} [props.initialState] - Optional initial state for the controller
 * @param {Function} props.nativeScryptCrypto - Native scrypt crypto implementation for encryption
 * @param {Object} [props.config] - Optional configuration object for the controller
 * @param {TraceCallback} [props.trace] - Optional trace callback for debugging and monitoring
 * @returns {UserStorageController} Configured UserStorageController instance
 */
export const createUserStorageController = (props: {
  messenger: UserStorageControllerMessenger;
  initialState?: UserStorageControllerState;
  nativeScryptCrypto: ConstructorParameters<
    typeof UserStorageController
  >['0']['nativeScryptCrypto'];
  config?: ConstructorParameters<typeof UserStorageController>['0']['config'];
  trace?: TraceCallback;
}): UserStorageController => {
  const userStorageController = new UserStorageController({
    messenger: props.messenger,
    state: props.initialState,
    nativeScryptCrypto: props.nativeScryptCrypto,
    config: props.config,
    ...(props.trace && { trace: props.trace }),
  } as ConstructorParameters<typeof UserStorageController>[0]);
  return userStorageController;
};
