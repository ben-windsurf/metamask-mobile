import { TransactionMeta } from '@metamask/transaction-controller';

import { useTransactionMetadataRequest } from '../transactions/useTransactionMetadataRequest';
import { EIP_7702_REVOKE_ADDRESS } from './useEIP7702Accounts';

/**
 * Custom hook that analyzes EIP-7702 transaction types and characteristics
 * Determines if a transaction is an upgrade, downgrade, batched operation, or self-transaction
 * Used in confirmation flows to provide appropriate UI and validation for EIP-7702 transactions
 * @returns {Object} Object containing boolean flags for different EIP-7702 transaction types
 * @returns {boolean} returns.isDowngrade - True if transaction revokes authorization (downgrade)
 * @returns {boolean} returns.isUpgrade - True if transaction adds new authorization (upgrade)
 * @returns {boolean} returns.isBatched - True if transaction contains nested transactions
 * @returns {boolean} returns.isBatchedUpgrade - True if transaction is both upgrade and batched
 * @returns {boolean} returns.isUpgradeOnly - True if transaction only upgrades without additional data
 * @returns {boolean} returns.is7702transaction - True if transaction is a self-transaction (from === to)
 */
export function use7702TransactionType() {
  const transactionMetadata: TransactionMeta | undefined =
    useTransactionMetadataRequest();

  const { nestedTransactions, txParams } = transactionMetadata ?? {
    txParams: { data: '', authorizationList: [] },
  };
  const { authorizationList, data, from, to } = txParams ?? { data: '' };
  const authorizationAddress = authorizationList?.[0]?.address;

  const isDowngrade =
    Boolean(authorizationAddress) &&
    authorizationAddress === EIP_7702_REVOKE_ADDRESS;

  const isUpgrade =
    Boolean(authorizationAddress) &&
    authorizationAddress !== EIP_7702_REVOKE_ADDRESS;

  const isUpgradeOnly = isUpgrade && (!data || data === '0x');

  const is7702transaction = from?.toLowerCase() === to?.toLowerCase();

  return {
    isDowngrade,
    isUpgrade,
    isBatched: Boolean(nestedTransactions?.length),
    isBatchedUpgrade: isUpgrade && Boolean(nestedTransactions?.length),
    isUpgradeOnly,
    is7702transaction,
  };
}
