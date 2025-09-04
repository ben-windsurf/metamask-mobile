import {
  UserStorageControllerMessenger,
  UserStorageControllerState,
  Controller as UserStorageController,
} from '@metamask/profile-sync-controller/user-storage';
import type { TraceCallback } from '@metamask/controller-utils';

/**
 * Creates and configures a UserStorageController instance for managing user data storage.
 * This controller handles encrypted storage of user data with profile synchronization capabilities.
 *
 * @param props - Configuration properties for the controller
 * @param props.messenger - Controller messenger for inter-controller communication
 * @param props.initialState - Optional initial state for the controller
 * @param props.nativeScryptCrypto - Native scrypt crypto implementation for encryption
 * @param props.config - Optional configuration settings for the controller
 * @param props.trace - Optional trace callback for debugging and monitoring
 * @returns Configured UserStorageController instance
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
