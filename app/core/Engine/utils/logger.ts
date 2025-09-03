import { KeyringControllerState } from '@metamask/keyring-controller';
import { EngineState } from '../types';
import Logger from '../../../util/Logger';

/**
 * Logs the creation of the MetaMask Engine with information about the initial state
 * Used for debugging and monitoring Engine initialization during app startup
 * @param {Partial<EngineState>} initialState - The initial state passed to the Engine (default: empty object)
 * @param {KeyringControllerState | null} initialKeyringState - Optional keyring state from backup restoration
 */
export function logEngineCreation(
  initialState: Partial<EngineState> = {},
  initialKeyringState?: KeyringControllerState | null,
) {
  if (Object.keys(initialState).length === 0) {
    Logger.log('Engine initialized with empty state', {
      keyringStateFromBackup: !!initialKeyringState,
    });
  } else {
    Logger.log('Engine initialized with non-empty state', {
      hasAccountsState: !!initialState.AccountsController,
      hasKeyringState: !!initialState.KeyringController,
      keyringStateFromBackup: !!initialKeyringState,
    });
  }
}
