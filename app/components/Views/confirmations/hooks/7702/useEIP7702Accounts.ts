import { Hex } from '@metamask/utils';
import { NetworkConfiguration } from '@metamask/network-controller';
import {
  TransactionEnvelopeType,
  TransactionType,
} from '@metamask/transaction-controller';
import { useCallback } from 'react';

import { addMMOriginatedTransaction } from '../../utils/transaction';

/**
 * Address constant used to revoke EIP-7702 account delegations
 * Points to the zero address to effectively remove any existing delegation
 */
export const EIP_7702_REVOKE_ADDRESS =
  '0x0000000000000000000000000000000000000000';

/**
 * Custom hook for managing EIP-7702 account operations (upgrade/downgrade)
 * Provides functionality to upgrade accounts to smart contract accounts and downgrade them back
 * @param {NetworkConfiguration} networkConfiguration - Network configuration containing RPC endpoints
 * @returns {Object} Object containing downgradeAccount and upgradeAccount functions
 */
export function useEIP7702Accounts(networkConfiguration: NetworkConfiguration) {
  const defaultRpcEndpoint =
    networkConfiguration.rpcEndpoints[
      networkConfiguration.defaultRpcEndpointIndex
    ];
  const { networkClientId } = defaultRpcEndpoint as { networkClientId: string };

  const downgradeAccount = useCallback(
    async (address: Hex) => {
      await addMMOriginatedTransaction(
        {
          authorizationList: [
            {
              address: EIP_7702_REVOKE_ADDRESS,
            },
          ],
          from: address,
          to: address,
          type: TransactionEnvelopeType.setCode,
        },
        {
          networkClientId,
          type: TransactionType.revokeDelegation,
        },
      );
    },
    [networkClientId],
  );

  const upgradeAccount = useCallback(
    async (address: Hex, upgradeContractAddress: Hex) => {
      await addMMOriginatedTransaction(
        {
          authorizationList: [
            {
              address: upgradeContractAddress,
            },
          ],
          from: address,
          to: address,
          type: TransactionEnvelopeType.setCode,
        },
        {
          networkClientId,
          type: TransactionType.batch,
        },
      );
    },
    [networkClientId],
  );

  return { downgradeAccount, upgradeAccount };
}
