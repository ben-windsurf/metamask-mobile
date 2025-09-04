import { EthAccountType, EthScope } from '@metamask/keyring-api';
import { InternalAccount } from '@metamask/keyring-internal-api';
import { isObject, hasProperty } from '@metamask/utils';
import { captureException } from '@sentry/react-native';
import { getUUIDFromAddressOfNormalAccount } from '@metamask/accounts-controller';
import { KeyringTypes } from '@metamask/keyring-controller';
import { ETH_EOA_METHODS } from '../../constants/eth-methods';

/**
 * Interface representing an account identity in the migration process.
 * @interface Identity
 * @property name - The display name of the account
 * @property address - The Ethereum address of the account
 * @property lastSelected - Optional timestamp when the account was last selected
 * @property importTime - Optional timestamp when the account was imported
 */
export interface Identity {
  name: string;
  address: string;
  lastSelected?: number;
  importTime?: number;
}

/**
 * Migration function to transform legacy account state to the new AccountsController format.
 * Migrates from PreferencesController identities to AccountsController internal accounts.
 *
 * @param state - The application state to migrate
 * @returns The migrated state with AccountsController properly initialized
 */
export default function migrate(state: unknown) {
  if (!isObject(state)) {
    captureException(
      new Error(`Migration 36: Invalid root state: '${typeof state}'`),
    );
    return state;
  }

  if (!isObject(state.engine)) {
    captureException(
      new Error(
        `Migration 36: Invalid root engine state: '${typeof state.engine}'`,
      ),
    );
    return state;
  }

  if (!isObject(state.engine.backgroundState)) {
    captureException(
      new Error(
        `Migration 36: Invalid root engine backgroundState: '${typeof state
          .engine.backgroundState}'`,
      ),
    );
    return state;
  }

  const keyringControllerState = state.engine.backgroundState.KeyringController;
  if (!isObject(keyringControllerState)) {
    captureException(
      new Error(
        `Migration 36: Invalid vault in KeyringController: '${typeof keyringControllerState}'`,
      ),
    );
  }

  if (!isObject(state.engine.backgroundState.PreferencesController)) {
    captureException(
      new Error(
        `Migration 36: Invalid PreferencesController state: '${typeof state
          .engine.backgroundState.PreferencesController}'`,
      ),
    );
    return state;
  }
  if (
    !hasProperty(
      state.engine.backgroundState.PreferencesController,
      'identities',
    )
  ) {
    captureException(
      new Error(
        `Migration 36: Missing identities property from PreferencesController: '${typeof state
          .engine.backgroundState.PreferencesController}'`,
      ),
    );
    return state;
  }
  createDefaultAccountsController(state);
  createInternalAccountsForAccountsController(state);
  createSelectedAccountForAccountsController(state);
  return state;
}

/**
 * Creates a default AccountsController structure in the state.
 * Initializes the internal accounts object with empty accounts and selectedAccount.
 *
 * @param state - The application state to modify
 */
// TODO: Replace "any" with type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createDefaultAccountsController(state: Record<string, any>) {
  state.engine.backgroundState.AccountsController = {
    internalAccounts: {
      accounts: {},
      selectedAccount: '',
    },
  };
}

/**
 * Creates internal accounts for the AccountsController based on existing identities.
 * Transforms PreferencesController identities into AccountsController internal accounts format.
 *
 * @param state - The application state containing PreferencesController identities
 */
function createInternalAccountsForAccountsController(
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: Record<string, any>,
) {
  const identities: {
    [key: string]: Identity;
  } = state.engine.backgroundState.PreferencesController?.identities || {};

  if (Object.keys(identities).length === 0) {
    captureException(
      new Error(`Migration 36: PreferencesController?.identities are empty'`),
    );
    return;
  }

  const accounts: Record<string, InternalAccount> = {};

  for (const identity of Object.values(identities)) {
    const lowerCaseAddress = identity.address.toLocaleLowerCase();
    const expectedId = getUUIDFromAddressOfNormalAccount(lowerCaseAddress);

    accounts[expectedId] = {
      address: identity.address,
      scopes: [EthScope.Eoa],
      id: expectedId,
      options: {},
      metadata: {
        name: identity.name,
        importTime: identity.importTime ?? Date.now(),
        lastSelected: identity.lastSelected ?? undefined,
        keyring: {
          // This is default HD Key Tree type because the keyring is encrypted
          // during migration, the type will get updated when the during the
          // initial updateAccounts call.
          type: KeyringTypes.hd,
        },
      },
      methods: ETH_EOA_METHODS,

      type: EthAccountType.Eoa,
    };
  }
  state.engine.backgroundState.AccountsController.internalAccounts.accounts =
    accounts;
}

/**
 * Finds an internal account by its Ethereum address.
 * Performs case-insensitive address matching.
 *
 * @param state - The application state containing AccountsController
 * @param address - The Ethereum address to search for
 * @returns The matching internal account or undefined if not found
 */
function findInternalAccountByAddress(
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: Record<string, any>,
  address: string,
): InternalAccount | undefined {
  return Object.values<InternalAccount>(
    state.engine.backgroundState.AccountsController.internalAccounts.accounts,
  ).find(
    (account: InternalAccount) =>
      account.address.toLowerCase() === address.toLowerCase(),
  );
}

/**
 * Sets the selected account in AccountsController based on PreferencesController selectedAddress.
 * Handles cases where selectedAddress is invalid by falling back to the first available account.
 *
 * @param state - The application state to modify
 */
function createSelectedAccountForAccountsController(
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: Record<string, any>,
) {
  const selectedAddress =
    state.engine.backgroundState.PreferencesController?.selectedAddress;

  // Handle the case where the selectedAddress from preferences controller is either not defined or not a string
  if (!selectedAddress || typeof selectedAddress !== 'string') {
    captureException(
      new Error(
        `Migration 36: Invalid selectedAddress. state.engine.backgroundState.PreferencesController?.selectedAddress is not a string:'${typeof selectedAddress}'. Setting selectedAddress to the first account.`,
      ),
    );
    // Get the first account if selectedAddress is not a string
    const [firstAddress] = Object.keys(
      state.engine.backgroundState.PreferencesController?.identities,
    );
    const internalAccount = findInternalAccountByAddress(state, firstAddress);

    if (internalAccount) {
      if (internalAccount.id === undefined) {
        captureException(
          new Error(
            `Migration 36: selectedAccount will be undefined because internalAccount.id is undefined.`,
          ),
        );
      }
      state.engine.backgroundState.AccountsController.internalAccounts.selectedAccount =
        internalAccount.id;
      state.engine.backgroundState.PreferencesController.selectedAddress =
        internalAccount.address;
    }
    return;
  }

  const selectedAccount = findInternalAccountByAddress(state, selectedAddress);
  if (selectedAccount) {
    if (selectedAccount.id === undefined) {
      captureException(
        new Error(
          `Migration 36: selectedAccount will be undefined because selectedAccount.id is undefined.`,
        ),
      );
    }
    state.engine.backgroundState.AccountsController.internalAccounts.selectedAccount =
      selectedAccount.id;
  }
}
