import { Hex } from '@metamask/utils';
import { MultichainNetworkConfiguration } from '@metamask/multichain-network-controller';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Engine from '../../../../../core/Engine';
import { TESTNET_CHAIN_IDS } from '../../../../../util/networks';
import { selectNetworkConfigurations } from '../../../../../selectors/networkController';
import { useAsyncResultOrThrow } from '../../../../hooks/useAsyncResult';

export type EIP7702NetworkConfiguration = MultichainNetworkConfiguration & {
  isSupported: boolean;
  upgradeContractAddress?: Hex;
};

/**
 * Custom hook that retrieves and filters networks supporting EIP-7702 atomic batch transactions
 * Separates test and non-test networks, checks atomic batch support for a given address,
 * and returns networks that support EIP-7702 functionality for transaction confirmations
 * @param {string} address - The wallet address to check atomic batch support for
 * @returns {Object} Object containing network7702List, networkSupporting7702Present flag, and pending state
 */
export const useEIP7702Networks = (address: string) => {
  const networks = useSelector(selectNetworkConfigurations);

  const [nonTestNetworks, testNetworks] = useMemo(
    () =>
      Object.entries(networks).reduce(
        ([nonTestnetsList, testnetsList], [chainId, network]) => {
          const isTest = (TESTNET_CHAIN_IDS as string[]).includes(chainId);
          (isTest ? testnetsList : nonTestnetsList)[chainId] = network;
          return [nonTestnetsList, testnetsList];
        },
        [
          {} as Record<string, MultichainNetworkConfiguration>,
          {} as Record<string, MultichainNetworkConfiguration>,
        ],
      ),
    [networks],
  );

  const networkList = useMemo(
    () => ({ ...nonTestNetworks, ...testNetworks }),
    [nonTestNetworks, testNetworks],
  );

  const { pending, value } = useAsyncResultOrThrow(async () => {
    const chainIds = Object.keys(networkList) as Hex[];

    return await Engine.context.TransactionController.isAtomicBatchSupported({
      address: address as Hex,
      chainIds,
    });
  }, [address, networkList]);

  const network7702List: EIP7702NetworkConfiguration[] | undefined =
    useMemo(() => {
      if (!value) {
        return [];
      }

      const networksSupporting7702: EIP7702NetworkConfiguration[] = [];
      Object.values(networkList).forEach((network) => {
        try {
          const atomicBatchResult = value.find(
            ({ chainId }) => chainId === network.chainId,
          );
          if (atomicBatchResult) {
            networksSupporting7702.push({
              ...atomicBatchResult,
              ...network,
            });
          }
        } catch (err: unknown) {
          // console.log(err);
        }
      });

      return networksSupporting7702;
    }, [networkList, value]);

  return {
    network7702List,
    networkSupporting7702Present: network7702List?.length > 0,
    pending,
  };
};
