import { KeyringControllerState } from '@metamask/keyring-controller';
import { EngineState } from '../types';
import Logger from '../../../util/Logger';

/**
 * Logs the creation of the Engine with information about the initial state.
 * Provides debugging information about whether the engine was initialized with
 * existing state or from a fresh start.
 *
 * @param initialState - Partial engine state used for initialization
 * @param initialKeyringState - Optional keyring controller state from backup
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
