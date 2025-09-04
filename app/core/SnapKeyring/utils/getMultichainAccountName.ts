import { BtcScope, SolScope } from '@metamask/keyring-api';
import { KeyringTypes } from '@metamask/keyring-controller';
import { CaipChainId } from '@metamask/utils';
import { strings } from '../../../../locales/i18n';
import Engine from '../../Engine';
import { WalletClientType } from '../MultichainWalletSnapClient';

/**
 * Generates an appropriate account name for multichain accounts based on the scope and client type.
 * Returns localized account names for different blockchain networks (Bitcoin, Solana) and their testnets.
 *
 * @param scope - The CAIP chain ID scope defining the blockchain network
 * @param clientType - The type of wallet client (Bitcoin, Solana, etc.)
 * @returns The formatted account name string with appropriate network prefix and account number
 *
 * @example
 * ```typescript
 * // Bitcoin mainnet account
 * const name = getMultichainAccountName(BtcScope.Mainnet, WalletClientType.Bitcoin);
 * // Returns: "Bitcoin Account 1"
 *
 * // Solana testnet account
 * const testName = getMultichainAccountName(SolScope.Testnet, WalletClientType.Solana);
 * // Returns: "Solana Testnet Account 1"
 * ```
 */
export function getMultichainAccountName(
  scope?: CaipChainId,
  clientType?: WalletClientType,
) {
  const nextAvailableAccountName =
    Engine.context.AccountsController.getNextAvailableAccountName(
      clientType ? KeyringTypes.snap : KeyringTypes.hd,
    );
  const accountNumber = nextAvailableAccountName.split(' ').pop();

  let accountNameToUse = nextAvailableAccountName;

  if (!clientType || !scope) {
    return accountNameToUse;
  }

  switch (clientType) {
    case WalletClientType.Bitcoin: {
      switch (scope) {
        case BtcScope.Testnet:
        case BtcScope.Testnet4:
          accountNameToUse = `${strings(
            'accounts.labels.bitcoin_testnet_account_name',
          )} ${accountNumber}`;
          break;
        case BtcScope.Signet:
          accountNameToUse = `${strings(
            'accounts.labels.bitcoin_signet_account_name',
          )} ${accountNumber}`;
          break;
        case BtcScope.Regtest:
          accountNameToUse = `${strings(
            'accounts.labels.bitcoin_regtest_account_name',
          )} ${accountNumber}`;
          break;
        default:
          accountNameToUse = `${strings(
            'accounts.labels.bitcoin_account_name',
          )} ${accountNumber}`;
          break;
      }
      break;
    }
    case WalletClientType.Solana: {
      switch (scope) {
        case SolScope.Devnet:
          accountNameToUse = `${strings(
            'accounts.labels.solana_devnet_account_name',
          )} ${accountNumber}`;
          break;
        case SolScope.Testnet:
          accountNameToUse = `${strings(
            'accounts.labels.solana_testnet_account_name',
          )} ${accountNumber}`;
          break;
        default:
          accountNameToUse = `${strings(
            'accounts.labels.solana_account_name',
          )} ${accountNumber}`;
          break;
      }
      break;
    }
    default:
      break;
  }
  return accountNameToUse;
}
