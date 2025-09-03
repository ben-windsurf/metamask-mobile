import BN from 'bnjs5';
import { BNToHex, toHex } from '@metamask/controller-utils';
import { TransactionParams } from '@metamask/transaction-controller';

import { generateTransferData } from '../../../../../util/transactions';
import { toTokenMinimalUnit, toWei } from '../../../../../util/number';
import { AssetType } from '../../types/token';
import { isNativeToken } from '../../utils/generic';

/**
 * Prepares an EVM transaction based on the asset type and transaction parameters
 * Handles native tokens, NFTs (ERC-721), and ERC-20 tokens with appropriate data encoding
 * @param {AssetType} asset - The asset being transferred (native token, ERC-20, or NFT)
 * @param {TransactionParams} transactionParams - Base transaction parameters including from, to, and value
 * @returns {TransactionParams} Prepared transaction parameters with appropriate data, to, and value fields
 */
export const prepareEVMTransaction = (
  asset: AssetType,
  transactionParams: TransactionParams,
) => {
  const { from, to, value } = transactionParams;
  const trxnParams: TransactionParams = { from };
  if (isNativeToken(asset)) {
    trxnParams.data = '0x';
    trxnParams.to = to;
    trxnParams.value = BNToHex(toWei(value ?? '0') as unknown as BN);
  } else if (asset.tokenId) {
    trxnParams.data = generateTransferData('transferFrom', {
      fromAddress: from,
      toAddress: to,
      tokenId: toHex(asset.tokenId),
    });
    trxnParams.to = asset.address;
    trxnParams.value = '0x0';
  } else {
    const tokenAmount = toTokenMinimalUnit(value ?? '0', asset.decimals);
    trxnParams.data = generateTransferData('transfer', {
      toAddress: to,
      amount: BNToHex(tokenAmount),
    });
    trxnParams.to = asset.address;
    trxnParams.value = '0x0';
  }
  return trxnParams;
};
