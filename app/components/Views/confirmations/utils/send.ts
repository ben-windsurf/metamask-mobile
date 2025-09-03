import { BNToHex, toHex } from '@metamask/controller-utils';
import { Nft } from '@metamask/assets-controllers';
import { TransactionParams } from '@metamask/transaction-controller';

import Routes from '../../../../constants/navigation/Routes';
import { generateTransferData } from '../../../../util/transactions';
import { toTokenMinimalUnit, toWei } from '../../../../util/number';
import { AssetType } from '../types/token';
import { isNativeToken } from '../utils/generic';

/**
 * Checks if the send redesign feature is enabled via environment variable
 * @returns {boolean} True if send redesign is enabled, false otherwise
 */
export const isSendRedesignEnabled = () =>
  process.env.MM_SEND_REDESIGN_ENABLED === 'true';

/**
 * Handles navigation to the appropriate send page based on feature flags
 * Routes to either the redesigned send flow or the legacy send flow
 * @param {Function} navigate - Navigation function for screen transitions
 * @param {AssetType | Nft} asset - The asset or NFT to be sent
 */
export const handleSendPageNavigation = (
  navigate: <RouteName extends string>(
    screenName: RouteName,
    params?: object,
  ) => void,
  asset: AssetType | Nft,
) => {
  if (isSendRedesignEnabled()) {
    navigate(Routes.SEND.DEFAULT, {
      screen: Routes.SEND.ROOT,
      params: {
        asset,
      },
    });
  } else {
    navigate('SendFlowView');
  }
};

/**
 * Prepares EVM transaction parameters for different asset types
 * Handles native tokens, ERC-20 tokens, and NFTs with appropriate transaction data
 * @param {AssetType} asset - The asset being transferred (native, ERC-20, or NFT)
 * @param {TransactionParams} transactionParams - Base transaction parameters including from, to, and value
 * @returns {TransactionParams} Prepared transaction parameters with appropriate data and value fields
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
    trxnParams.value = BNToHex(toWei(value ?? '0') as unknown as BigNumber);
  } else if (asset.tokenId) {
    // NFT token
    trxnParams.data = generateTransferData('transferFrom', {
      fromAddress: from,
      toAddress: to,
      tokenId: toHex(asset.tokenId),
    });
    trxnParams.to = asset.address;
    trxnParams.value = '0x0';
  } else {
    // ERC20 token
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
