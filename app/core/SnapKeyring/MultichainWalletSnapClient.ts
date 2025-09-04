import { CaipChainId, Json, SnapId } from '@metamask/snaps-sdk';
import { KeyringClient, Sender } from '@metamask/keyring-snap-client';
import {
  ///: BEGIN:ONLY_INCLUDE_IF(bitcoin)
  BtcScope,
  ///: END:ONLY_INCLUDE_IF
  EntropySourceId,
  ///: BEGIN:ONLY_INCLUDE_IF(solana)
  SolScope,
  ///: END:ONLY_INCLUDE_IF
} from '@metamask/keyring-api';
import { captureException } from '@sentry/react-native';
import {
  BITCOIN_WALLET_SNAP_ID,
  BITCOIN_WALLET_NAME,
  BitcoinWalletSnapSender,
} from './BitcoinWalletSnap';
import {
  SOLANA_WALLET_SNAP_ID,
  SOLANA_WALLET_NAME,
  SolanaWalletSnapSender,
} from './SolanaWalletSnap';
import Engine from '../Engine';
import { SnapKeyring } from '@metamask/eth-snap-keyring';
import { store } from '../../store';
import { startPerformanceTrace } from '../redux/slices/performance';
import { PerformanceEventNames } from '../redux/slices/performance/constants';
import { getMultichainAccountName } from './utils/getMultichainAccountName';
import { endTrace, trace, TraceName, TraceOperation } from '../../util/trace';
import { getTraceTags } from '../../util/sentry/tags';
import {
  ///: BEGIN:ONLY_INCLUDE_IF(bitcoin)
  BITCOIN_DISCOVERY_PENDING,
  ///: END:ONLY_INCLUDE_IF

  ///: BEGIN:ONLY_INCLUDE_IF(solana)
  SOLANA_DISCOVERY_PENDING,
  ///: END:ONLY_INCLUDE_IF
} from '../../constants/storage';

/**
 * Enumeration of supported wallet client types for multichain wallet snaps.
 * Each type represents a different blockchain network that can be managed by wallet snaps.
 */
export enum WalletClientType {
  ///: BEGIN:ONLY_INCLUDE_IF(solana)
  /** Solana blockchain wallet client */
  Solana = 'solana',
  ///: END:ONLY_INCLUDE_IF

  ///: BEGIN:ONLY_INCLUDE_IF(bitcoin)
  /** Bitcoin blockchain wallet client */
  Bitcoin = 'bitcoin',
  ///: END:ONLY_INCLUDE_IF
}

/**
 * Mapping of wallet client types to their corresponding snap configurations.
 * Contains snap IDs, names, discovery scopes, and storage identifiers for each supported blockchain.
 */
export const WALLET_SNAP_MAP = {
  ///: BEGIN:ONLY_INCLUDE_IF(bitcoin)
  [WalletClientType.Bitcoin]: {
    id: BITCOIN_WALLET_SNAP_ID,
    name: BITCOIN_WALLET_NAME,
    discoveryScope: BtcScope.Mainnet,
    discoveryStorageId: BITCOIN_DISCOVERY_PENDING,
  },
  ///: END:ONLY_INCLUDE_IF

  ///: BEGIN:ONLY_INCLUDE_IF(solana)
  [WalletClientType.Solana]: {
    id: SOLANA_WALLET_SNAP_ID,
    name: SOLANA_WALLET_NAME,
    discoveryScope: SolScope.Mainnet,
    discoveryStorageId: SOLANA_DISCOVERY_PENDING,
  },
  ///: END:ONLY_INCLUDE_IF
};

/**
 * Configuration options for multichain wallet snap operations.
 * @interface MultichainWalletSnapOptions
 * @property scope - CAIP-2 chain ID specifying the blockchain scope
 * @property synchronize - Whether to synchronize the account with the snap
 * @property entropySource - Source of entropy for key generation
 * @property accountNameSuggestion - Suggested name for the account
 * @property derivationPath - BIP-44 derivation path for the account
 */
export interface MultichainWalletSnapOptions {
  /** CAIP-2 chain ID specifying the blockchain scope */
  scope?: CaipChainId;
  /** Whether to synchronize the account with the snap */
  synchronize?: boolean;
  /** Source of entropy for key generation */
  entropySource?: string;
  /** Suggested name for the account */
  accountNameSuggestion?: string;
  /** BIP-44 derivation path for the account */
  derivationPath?: string;
}

/**
 * Configuration options for SnapKeyring behavior.
 * @interface SnapKeyringOptions
 * @property displayConfirmation - Whether to display confirmation dialogs
 * @property displayAccountNameSuggestion - Whether to show account name suggestions
 * @property setSelectedAccount - Whether to set the account as selected after creation
 */
interface SnapKeyringOptions {
  /** Whether to display confirmation dialogs */
  displayConfirmation: boolean;
  /** Whether to show account name suggestions */
  displayAccountNameSuggestion: boolean;
  /** Whether to set the account as selected after creation */
  setSelectedAccount: boolean;
}

export abstract class MultichainWalletSnapClient {
  readonly snapId: SnapId;
  readonly snapName: string;
  readonly snapKeyringOptions: SnapKeyringOptions;

  protected constructor(
    snapId: SnapId,
    snapName: string,
    snapKeyringOptions: SnapKeyringOptions,
  ) {
    this.snapId = snapId;
    this.snapName = snapName;
    this.snapKeyringOptions = snapKeyringOptions;
  }

  getSnapId(): SnapId {
    return this.snapId;
  }

  getSnapName(): string {
    return this.snapName;
  }

  abstract getClientType(): WalletClientType;
  protected abstract getSnapSender(): Sender;

  /**
   * Executes a callback function with a SnapKeyring instance.
   * This method ensures proper initialization of the SnapKeyring and provides a safe way to interact with it.
   *
   * @param callback - An async function that receives a SnapKeyring instance and performs operations with it
   * @returns A Promise that resolves when the callback execution is complete
   * @throws Error if the SnapKeyring cannot be initialized or if the callback execution fails
   *
   */
  protected async withSnapKeyring(
    callback: (keyring: SnapKeyring) => Promise<unknown>,
  ) {
    const snapKeyring = (await Engine.getSnapKeyring()) as SnapKeyring;

    return await callback(snapKeyring);
  }

  /**
   * Starts sentry tracing.
   *
   * @param name Trace name.
   * @param op Trace operation.
   */
  private startTrace(name: TraceName, op: TraceOperation) {
    trace({
      name,
      op,
      tags: {
        'snap.id': this.snapId,
        ...getTraceTags(store.getState()),
      },
    });
  }

  /**
   * Ends sentry tracing.
   *
   * @param name Trace name.
   */
  private endTrace(name: TraceName) {
    endTrace({
      name,
    });
  }

  /**
   * Creates a new account using the SnapKeyring.
   * This method wraps the account creation process with proper SnapKeyring initialization and error handling.
   *
   * @param options - Configuration options for creating the multichain wallet account
   * @param snapKeyringOptions - Configuration options for the SnapKeyring
   * @returns A Promise that resolves when the account creation is complete
   * @throws Error if the account creation fails or if the SnapKeyring cannot be accessed
   *
   */
  async createAccount(
    options: MultichainWalletSnapOptions,
    snapKeyringOptions?: SnapKeyringOptions,
  ) {
    // This flow is async and start here, to end in the `SnapKeyring.addAccountFinalize` method.
    store.dispatch(
      startPerformanceTrace({
        eventName: PerformanceEventNames.AddSnapAccount,
      }),
    );

    // Same here.
    this.startTrace(
      TraceName.CreateSnapAccount,
      TraceOperation.CreateSnapAccount,
    );

    const accountName =
      options?.accountNameSuggestion ??
      getMultichainAccountName(options.scope, this.getClientType());

    return await this.withSnapKeyring(
      async (keyring) =>
        await keyring.createAccount(
          this.snapId,
          {
            ...options,
            accountNameSuggestion: accountName,
          } as unknown as Record<string, Json>,
          snapKeyringOptions ?? this.snapKeyringOptions,
        ),
    );
  }

  /**
   * Discovers accounts for the specified scopes using the provided entropy source.
   *
   * @param scopes - Array of CAIP-2 chain IDs to discover accounts for
   * @param entropySource - The source of entropy to use for account discovery
   * @param groupIndex - The index of the account group to discover
   * @returns A Promise that resolves with the discovered accounts
   * @throws Error if account discovery fails
   */
  async discoverAccounts(
    scopes: CaipChainId[],
    entropySource: EntropySourceId,
    groupIndex: number,
  ) {
    const keyringApiClient = new KeyringClient(this.getSnapSender());
    const accounts = await keyringApiClient.discoverAccounts(
      scopes,
      entropySource,
      groupIndex,
    );

    return accounts;
  }
  /**
   * Adds discovered accounts to the SnapKeyring.
   * This method discovers accounts for the configured scopes and adds them to the keyring.
   *
   * @param entropySource - The source of entropy to use for account discovery
   * @returns A Promise that resolves when all accounts have been added
   * @throws Error if account discovery or addition fails
   */
  /**
   * Adds discovered accounts to the SnapKeyring.
   * This method discovers accounts for the configured scopes and adds them to the keyring.
   *
   * @param entropySource - The source of entropy to use for account discovery
   * @param scope - The CAIP-2 chain ID to discover accounts for
   * @returns A Promise that resolves when all accounts have been added
   * @throws Error if account discovery or addition fails
   */
  async addDiscoveredAccounts(
    entropySource: EntropySourceId,
    scope: CaipChainId,
  ) {
    this.startTrace(
      TraceName.SnapDiscoverAccounts,
      TraceOperation.DiscoverAccounts,
    );

    let totalDiscoveredAccounts = 0;

    for (let index = 0; ; index++) {
      const discoveredAccounts = await this.discoverAccounts(
        [scope],
        entropySource,
        index,
      );

      // No accounts discovered
      if (discoveredAccounts.length === 0) {
        // For the first index, create a default account
        if (index === 0) {
          try {
            await this.createAccount(
              {
                scope,
                entropySource,
                synchronize: false,
              },
              {
                displayConfirmation: false,
                displayAccountNameSuggestion: false,
                setSelectedAccount: false,
              },
            );
          } catch (error) {
            captureException(new Error(`Failed to create account ${error}`));
          }
        }
        // Stop discovering accounts when none are found
        break;
      }

      // Process discovered accounts sequentially
      for (const account of discoveredAccounts) {
        try {
          await this.createAccount(
            {
              scope,
              derivationPath: account.derivationPath,
              entropySource,
            },
            {
              displayConfirmation: false,
              displayAccountNameSuggestion: false,
              setSelectedAccount: false,
            },
          );
          totalDiscoveredAccounts += 1;
        } catch (error) {
          captureException(new Error(`Failed to create account ${error}`));
        }
      }
    }

    this.endTrace(TraceName.SnapDiscoverAccounts);

    return totalDiscoveredAccounts;
  }
}

export class BitcoinWalletSnapClient extends MultichainWalletSnapClient {
  constructor(snapKeyringOptions: SnapKeyringOptions) {
    super(BITCOIN_WALLET_SNAP_ID, BITCOIN_WALLET_NAME, snapKeyringOptions);
  }

  getClientType(): WalletClientType {
    return WalletClientType.Bitcoin;
  }

  protected getSnapSender(): Sender {
    return new BitcoinWalletSnapSender();
  }

  async createAccount(
    options: MultichainWalletSnapOptions,
    snapKeyringOptions?: SnapKeyringOptions,
  ) {
    return super.createAccount(options, snapKeyringOptions);
  }
}

export class SolanaWalletSnapClient extends MultichainWalletSnapClient {
  constructor(snapKeyringOptions: SnapKeyringOptions) {
    super(SOLANA_WALLET_SNAP_ID, SOLANA_WALLET_NAME, snapKeyringOptions);
  }

  getClientType(): WalletClientType {
    return WalletClientType.Solana;
  }

  protected getSnapSender(): Sender {
    return new SolanaWalletSnapSender();
  }
}

export class MultichainWalletSnapFactory {
  private static defaultOptions: SnapKeyringOptions = {
    displayConfirmation: false,
    displayAccountNameSuggestion: false,
    setSelectedAccount: true,
  };

  static createClient(
    clientType: WalletClientType,
    options: Partial<SnapKeyringOptions> = {},
  ): MultichainWalletSnapClient {
    const snapKeyringOptions = {
      ...this.defaultOptions,
      ...options,
    };

    switch (clientType) {
      case WalletClientType.Bitcoin:
        return new BitcoinWalletSnapClient(snapKeyringOptions);
      case WalletClientType.Solana:
        return new SolanaWalletSnapClient(snapKeyringOptions);
      default:
        throw new Error(`Unsupported client type: ${clientType}`);
    }
  }
}
