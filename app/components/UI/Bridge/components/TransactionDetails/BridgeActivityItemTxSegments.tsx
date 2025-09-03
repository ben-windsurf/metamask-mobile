import React from 'react';
import { TransactionStatus } from '@metamask/transaction-controller';
import { BridgeHistoryItem } from '@metamask/bridge-status-controller';
import Text, {
  TextColor,
} from '../../../../../component-library/components/Texts/Text';
import { Box } from '../../../Box/Box';
import Segment from './Segment';
import { FlexDirection } from '../../../Box/box.types';
import { Transaction } from '@metamask/keyring-api';
import { StatusTypes } from '@metamask/bridge-controller';

/**
 * Gets the transaction index based on source transaction status
 * @param srcTxStatus - The source transaction status
 * @returns The transaction index (1 for pending, 2 for complete)
 * @throws Error if status is not recognized
 */
const getTxIndex = (srcTxStatus: StatusTypes) => {
  if (srcTxStatus === StatusTypes.PENDING) {
    return 1;
  }

  if (srcTxStatus === StatusTypes.COMPLETE) {
    return 2;
  }

  throw new Error('No more possible states for srcTxStatus');
};

/**
 * Converts transaction status to source transaction status for bridge operations
 * @param transactionStatus - The transaction status (EVM or Solana)
 * @returns StatusTypes.COMPLETE if confirmed, StatusTypes.PENDING otherwise
 */
const getSrcTxStatus = (
  transactionStatus: TransactionStatus | Transaction['status'],
) =>
  transactionStatus === TransactionStatus.confirmed
    ? StatusTypes.COMPLETE
    : StatusTypes.PENDING;

/**
 * Determines the destination transaction status for bridge operations
 * @param params - Parameters object
 * @param params.bridgeTxHistoryItem - The bridge history item containing transaction details
 * @param params.srcTxStatus - The source transaction status
 * @returns StatusTypes.COMPLETE if dest tx is complete, StatusTypes.PENDING if pending, null if src tx not complete
 */
const getDestTxStatus = ({
  bridgeTxHistoryItem,
  srcTxStatus,
}: {
  bridgeTxHistoryItem?: BridgeHistoryItem;
  srcTxStatus: StatusTypes;
}) => {
  if (srcTxStatus !== StatusTypes.COMPLETE) {
    return null;
  }

  return bridgeTxHistoryItem?.status.destChain?.txHash &&
    bridgeTxHistoryItem.status.status === StatusTypes.COMPLETE
    ? StatusTypes.COMPLETE
    : StatusTypes.PENDING;
};

/**
 * Renders the 2 transaction segments for a bridge activity item
 *
 * @param options
 * @param options.bridgeTxHistoryItem - The bridge history item for the transaction
 * @param options.transactionStatus - The transaction status for the transaction. TransactionStatus is for EVM, Transaction['status'] is for Solana
 */
export default function BridgeActivityItemTxSegments({
  bridgeTxHistoryItem,
  transactionStatus,
}: {
  bridgeTxHistoryItem?: BridgeHistoryItem;
  transactionStatus: TransactionStatus | Transaction['status'];
}) {
  const srcTxStatus = getSrcTxStatus(transactionStatus);
  const destTxStatus = getDestTxStatus({ bridgeTxHistoryItem, srcTxStatus });
  const txIndex = getTxIndex(srcTxStatus);

  return (
    <Box flexDirection={FlexDirection.Column} gap={2}>
      <Text color={TextColor.Alternative}>Transaction {txIndex} of 2</Text>
      <Box gap={2} flexDirection={FlexDirection.Row}>
        <Segment type={srcTxStatus} />
        <Segment type={destTxStatus} />
      </Box>
    </Box>
  );
}
