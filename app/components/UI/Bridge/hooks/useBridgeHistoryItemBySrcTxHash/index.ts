import { useSelector } from 'react-redux';
import { selectBridgeHistoryForAccount } from '../../../../../selectors/bridgeStatusController';
import { BridgeHistoryItem } from '@metamask/bridge-status-controller';
import { useMemo } from 'react';

/**
 * Custom hook to get bridge history items indexed by source transaction hash
 * Creates a lookup map for efficient access to bridge history items using their source transaction hash
 * Primarily used for non-EVM transactions where source hash lookup is needed
 * @returns {Object} Object containing bridgeHistoryItemsBySrcTxHash lookup map
 */
export const useBridgeHistoryItemBySrcTxHash = () => {
  const bridgeHistory = useSelector(selectBridgeHistoryForAccount);

  // Create a lookup map for faster access to bridge history items by source transaction hash.
  const bridgeHistoryItemsBySrcTxHash: Record<string, BridgeHistoryItem> =
    useMemo(() => {
      const bridgeHistoryItemsBySrcTxHash_: Record<string, BridgeHistoryItem> =
        {};

      Object.values(bridgeHistory ?? {}).forEach((bridgeTx) => {
        const txHash = bridgeTx.status?.srcChain?.txHash;
        if (txHash) {
          bridgeHistoryItemsBySrcTxHash_[txHash] = bridgeTx;
        }
      });

      return bridgeHistoryItemsBySrcTxHash_;
    }, [bridgeHistory]);

  return {
    bridgeHistoryItemsBySrcTxHash,
  };
};
