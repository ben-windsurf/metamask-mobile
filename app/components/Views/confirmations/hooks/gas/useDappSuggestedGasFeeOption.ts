import { useCallback, useMemo } from 'react';
import {
  UserFeeLevel,
  type TransactionMeta,
} from '@metamask/transaction-controller';

import { strings } from '../../../../../../locales/i18n';
import { updateTransactionGasFees } from '../../../../../util/transaction-controller';
import { type GasOption } from '../../types/gas';
import { EMPTY_VALUE_STRING, GasOptionIcon } from '../../constants/gas';
import { MMM_ORIGIN } from '../../constants/confirmations';
import { useTransactionMetadataRequest } from '../transactions/useTransactionMetadataRequest';
import { useFeeCalculations } from './useFeeCalculations';

const HEX_ZERO = '0x0';

/**
 * Custom hook that provides dApp-suggested gas fee options for transaction confirmations
 * Creates gas fee options based on gas fees suggested by the dApp, allowing users to select
 * the dApp's recommended gas settings for their transactions
 * @param {Object} params - Hook parameters
 * @param {() => void} params.handleCloseModals - Function to close gas fee selection modals
 * @returns {GasOption[]} Array of gas fee options including dApp-suggested option if available
 */
export const useDappSuggestedGasFeeOption = ({
  handleCloseModals,
}: {
  handleCloseModals: () => void;
}): GasOption[] => {
  const transactionMeta = useTransactionMetadataRequest() as TransactionMeta;
  const { calculateGasEstimate } = useFeeCalculations(transactionMeta);

  const { dappSuggestedGasFees, id, origin, userFeeLevel } = transactionMeta;

  const onDappSuggestedGasFeeClick = useCallback(() => {
    updateTransactionGasFees(id, {
      userFeeLevel: UserFeeLevel.DAPP_SUGGESTED,
      ...(dappSuggestedGasFees || {}),
    });
    handleCloseModals();
  }, [id, dappSuggestedGasFees, handleCloseModals]);

  const shouldIncludeDappSuggestedGasFeeOption = useMemo(
    () => origin !== MMM_ORIGIN && dappSuggestedGasFees,
    [origin, dappSuggestedGasFees],
  );

  const isDappSuggestedGasFeeSelected =
    userFeeLevel === UserFeeLevel.DAPP_SUGGESTED;

  const options: GasOption[] = [];

  if (shouldIncludeDappSuggestedGasFeeOption) {
    let feePerGas = HEX_ZERO;
    let gasPrice = HEX_ZERO;
    let gas = transactionMeta.gasLimitNoBuffer || HEX_ZERO;
    let shouldUseEIP1559FeeLogic = true;
    let priorityFeePerGas = HEX_ZERO;

    if (
      dappSuggestedGasFees?.maxFeePerGas &&
      dappSuggestedGasFees?.maxPriorityFeePerGas
    ) {
      feePerGas = dappSuggestedGasFees?.maxFeePerGas;
      priorityFeePerGas = dappSuggestedGasFees?.maxPriorityFeePerGas;
    } else if (dappSuggestedGasFees?.gasPrice) {
      gasPrice = dappSuggestedGasFees?.gasPrice;
      gas = dappSuggestedGasFees?.gas || HEX_ZERO;
      shouldUseEIP1559FeeLogic = false;
    }

    const { currentCurrencyFee, preciseNativeCurrencyFee } =
      calculateGasEstimate({
        feePerGas,
        priorityFeePerGas,
        gas,
        shouldUseEIP1559FeeLogic,
        gasPrice,
      });

    options.push({
      emoji: GasOptionIcon.SITE_SUGGESTED,
      estimatedTime: undefined,
      isSelected: isDappSuggestedGasFeeSelected,
      key: 'site_suggested',
      name: strings('transactions.gas_modal.site_suggested'),
      onSelect: onDappSuggestedGasFeeClick,
      value: preciseNativeCurrencyFee || EMPTY_VALUE_STRING,
      valueInFiat: currentCurrencyFee || EMPTY_VALUE_STRING,
    });
  }

  return options;
};
