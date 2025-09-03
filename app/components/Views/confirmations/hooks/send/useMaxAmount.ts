import BN from 'bnjs4';
import { AccountInformation } from '@metamask/assets-controllers';
import { Hex } from '@metamask/utils';
import { toHex } from '@metamask/controller-utils';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import Engine from '../../../../../core/Engine';
import {
  fromTokenMinimalUnitString,
  fromWei,
  hexToBN,
} from '../../../../../util/number/index';
import { selectAccounts } from '../../../../../selectors/accountTrackerController';
import { selectContractBalances } from '../../../../../selectors/tokenBalancesController';
import { AssetType } from '../../types/token';
import { isNativeToken } from '../../utils/generic';
import { useSendContext } from '../../context/send-context';
import { useGasFeeEstimates } from '../gas/useGasFeeEstimates';

const NATIVE_TRANSFER_GAS_LIMIT = 21000;
const GWEI_TO_WEI_CONVERSION_RATE = 1e9;

export interface GasFeeEstimatesType {
  medium: {
    suggestedMaxFeePerGas: number;
  };
}

/**
 * Calculates the estimated total gas cost for a native token transfer
 * Uses the medium gas fee estimate and standard transfer gas limit
 * @param {GasFeeEstimatesType} gasFeeEstimates - Gas fee estimates containing medium fee suggestion
 * @returns {BN} The estimated total gas cost in wei
 */
export const getEstimatedTotalGas = (gasFeeEstimates: GasFeeEstimatesType) => {
  if (!gasFeeEstimates) {
    return new BN(0);
  }
  const {
    medium: { suggestedMaxFeePerGas },
  } = gasFeeEstimates;
  const totalGas = new BN(suggestedMaxFeePerGas * NATIVE_TRANSFER_GAS_LIMIT);
  const conversionrate = new BN(GWEI_TO_WEI_CONVERSION_RATE);
  return totalGas.mul(conversionrate);
};

export interface GetMaxValueArgs {
  accounts: Record<Hex, AccountInformation>;
  asset?: AssetType;
  contractBalances: Record<Hex, Hex>;
  from: Hex;
  gasFeeEstimates: GasFeeEstimatesType;
}

/**
 * Calculates the maximum sendable amount for a given asset
 * For native tokens, subtracts estimated gas costs from balance
 * For ERC-20 tokens, returns the full contract balance
 * @param {GetMaxValueArgs} params - Parameters for max value calculation
 * @param {Record<Hex, AccountInformation>} params.accounts - Account information by address
 * @param {AssetType} params.asset - The asset to calculate max value for
 * @param {Record<Hex, Hex>} params.contractBalances - Token contract balances by address
 * @param {Hex} params.from - The sender's address
 * @param {GasFeeEstimatesType} params.gasFeeEstimates - Gas fee estimates for transaction cost calculation
 * @returns {string} The maximum sendable amount as a string
 */
export const getMaxValueFn = ({
  accounts,
  asset,
  contractBalances,
  from,
  gasFeeEstimates,
}: GetMaxValueArgs) => {
  if (!asset) {
    return '0';
  }
  if (isNativeToken(asset)) {
    const estimatedTotalGas = getEstimatedTotalGas(gasFeeEstimates);
    const accountAddress = Object.keys(accounts).find(
      (address) => address.toLowerCase() === from.toLowerCase(),
    ) as Hex;
    const account = accounts[accountAddress];
    const balance = hexToBN(account.balance);
    const realMaxValue = balance.sub(estimatedTotalGas);
    const maxValue =
      balance.isZero() || realMaxValue.isNeg() ? hexToBN('0x0') : realMaxValue;
    return fromWei(maxValue);
  }
  return fromTokenMinimalUnitString(
    contractBalances[asset.address as Hex],
    asset.decimals,
  );
};

const useMaxAmount = () => {
  const accounts = useSelector(selectAccounts);
  const contractBalances = useSelector(selectContractBalances);
  const { asset, from, updateValue } = useSendContext();
  const { chainId } = asset ?? { chainId: undefined };
  const { NetworkController } = Engine.context;
  const networkClientId = useMemo(
    () =>
      chainId
        ? NetworkController.findNetworkClientIdByChainId(toHex(chainId))
        : undefined,
    [chainId], // eslint-disable-line react-hooks/exhaustive-deps,
  );
  const { gasFeeEstimates } = useGasFeeEstimates(networkClientId ?? '');

  const updateToMaxAmount = useCallback(() => {
    const value = getMaxValueFn({
      accounts,
      asset,
      contractBalances,
      from: from as Hex,
      gasFeeEstimates: gasFeeEstimates as unknown as GasFeeEstimatesType,
    });
    updateValue(value);
  }, [accounts, asset, contractBalances, from, gasFeeEstimates, updateValue]);

  return { updateToMaxAmount };
};

export default useMaxAmount;
