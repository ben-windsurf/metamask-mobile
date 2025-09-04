import { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { GAS_ESTIMATE_TYPES } from '@metamask/gas-fee-controller';

import { selectAccounts } from '../../selectors/accountTrackerController';
import {
  selectConversionRate,
  selectCurrentCurrency,
} from '../../selectors/currencyRateController';
import { selectEvmTicker } from '../../selectors/networkController';
import { selectContractBalances } from '../../selectors/tokenBalancesController';
import { selectContractExchangeRates } from '../../selectors/tokenRatesController';
import { fromWei, isBN, toGwei } from '../../util/number';
import {
  parseTransactionEIP1559,
  parseTransactionLegacy,
} from '../../util/transactions';
import Engine from '../Engine';
import {
  GetEIP1559TransactionDataProps,
  LegacyProps,
  UseGasTransactionProps,
} from './types';
import { selectGasFeeEstimates } from '../../selectors/confirmTransaction';

/**
 * Starts gas fee polling to continuously fetch updated gas estimates from the network.
 *
 * @param token - Optional polling token. If not provided, a random token is generated.
 * @returns Promise that resolves to the polling token used to identify this gas polling session.
 */
export const startGasPolling = async (token?: string) => {
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { GasFeeController }: any = Engine.context;
  const pollToken = await GasFeeController.getGasFeeEstimatesAndStartPolling(
    token,
  );
  return pollToken;
};

/**
 * Stops gas fee polling and clears the token array state in the GasFeeController.
 *
 * @returns The result of stopping the polling operation.
 */
export const stopGasPolling = () => {
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { GasFeeController }: any = Engine.context;
  return GasFeeController.stopPolling();
};

/**
 * Custom hook that provides access to gas-related data from the Redux store.
 * Uses shallow equality to prevent unnecessary re-renders.
 *
 * @returns Object containing gas fee estimates, transaction state, exchange rates, and other gas-related data.
 */
export const useDataStore = () => {
  const [
    gasFeeEstimates,
    gasEstimateType,
    contractExchangeRates,
    conversionRate,
    currentCurrency,
    accounts,
    contractBalances,
    ticker,
    transaction,
    selectedAsset,
    showCustomNonce,
  ] = useSelector(
    // TODO: Replace "any" with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => [
      selectGasFeeEstimates(state),
      state.engine.backgroundState.GasFeeController.gasEstimateType,
      selectContractExchangeRates(state),
      selectConversionRate(state),
      selectCurrentCurrency(state),
      selectAccounts(state),
      selectContractBalances(state),
      selectEvmTicker(state),
      state.transaction,
      state.transaction.selectedAsset,
      state.settings.showCustomNonce,
    ],
    shallowEqual,
  );

  return {
    gasFeeEstimates,
    transactionState: transaction,
    gasEstimateType,
    contractExchangeRates,
    conversionRate,
    currentCurrency,
    accounts,
    contractBalances,
    selectedAsset,
    ticker,
    showCustomNonce,
  };
};

/**
 * Parses and calculates transaction data for EIP-1559 transactions with dynamic gas fees.
 *
 * @param props - Configuration object containing gas estimates, transaction state, and currency data.
 * @returns Parsed transaction data object or error message if parsing fails.
 */
export const getEIP1559TransactionData = ({
  gas,
  gasFeeEstimates,
  transactionState,
  contractExchangeRates,
  conversionRate,
  currentCurrency,
  nativeCurrency,
  onlyGas,
}: GetEIP1559TransactionDataProps) => {
  try {
    if (
      !gas ||
      !gasFeeEstimates ||
      !transactionState ||
      !currentCurrency ||
      !nativeCurrency
    ) {
      return 'Incomplete data for EIP1559 transaction';
    }

    const parsedTransactionEIP1559 = parseTransactionEIP1559(
      {
        contractExchangeRates,
        conversionRate,
        currentCurrency,
        nativeCurrency,
        transactionState: {
          selectedAsset: transactionState.selectedAsset,
          transaction: {
            value: transactionState.transaction.value,
            data: transactionState.transaction.data,
          },
        },
        gasFeeEstimates,
        swapsParams: undefined,
        selectedGasFee: {
          ...gas,
          estimatedBaseFee: gasFeeEstimates.estimatedBaseFee,
        },
      },
      { onlyGas },
    );

    return parsedTransactionEIP1559;
  } catch (error) {
    return 'Error parsing transaction data';
  }
};

/**
 * Parses and calculates transaction data for legacy transactions with fixed gas prices.
 *
 * @param props - Configuration object containing exchange rates, transaction state, and gas data.
 * @returns Parsed transaction data object for legacy gas pricing model.
 */
export const getLegacyTransactionData = ({
  contractExchangeRates,
  conversionRate,
  currentCurrency,
  transactionState,
  ticker,
  gas,
  onlyGas,
  multiLayerL1FeeTotal,
}: LegacyProps) => {
  const parsedTransactionData = parseTransactionLegacy(
    {
      contractExchangeRates,
      conversionRate,
      currentCurrency,
      transactionState,
      ticker,
      selectedGasFee: {
        ...gas,
      },
      multiLayerL1FeeTotal,
    },
    { onlyGas },
  );

  return parsedTransactionData;
};

/**
 * Custom hook that provides comprehensive transaction data with gas calculations.
 * Automatically switches between EIP-1559 and legacy transaction parsing based on network support.
 *
 * @param props - Configuration object specifying gas options, legacy mode, and fee calculations.
 * @returns Object containing complete transaction data with gas estimates and pricing.
 */
export const useGasTransaction = ({
  onlyGas,
  gasSelected,
  legacy,
  gasObject,
  gasObjectLegacy,
  multiLayerL1FeeTotal,
}: UseGasTransactionProps) => {
  const [gasEstimateTypeChange, updateGasEstimateTypeChange] =
    useState<string>('');

  const {
    gasFeeEstimates,
    transactionState,
    gasEstimateType,
    contractExchangeRates,
    conversionRate,
    currentCurrency,
    ticker,
  } = useDataStore();

  useEffect(() => {
    if (gasEstimateType !== gasEstimateTypeChange) {
      updateGasEstimateTypeChange(gasEstimateType);
    }
  }, [gasEstimateType, gasEstimateTypeChange]);

  const {
    transaction: { gas: transactionGas, gasPrice },
  } = transactionState;

  const suggestedGasLimit =
    gasObject?.suggestedGasLimit || fromWei(transactionGas, 'wei');

  let suggestedGasPrice;

  if (gasEstimateType === GAS_ESTIMATE_TYPES.FEE_MARKET) {
    suggestedGasPrice = gasObjectLegacy?.suggestedGasPrice;
  } else {
    suggestedGasPrice = gasFeeEstimates?.gasPrice || gasFeeEstimates?.low;
  }

  if (gasEstimateType !== GAS_ESTIMATE_TYPES.FEE_MARKET) {
    if (isBN(gasPrice)) {
      suggestedGasPrice =
        gasObjectLegacy?.suggestedGasPrice || toGwei(gasPrice).toString();
    } else {
      suggestedGasPrice =
        gasObjectLegacy?.suggestedGasPrice || gasFeeEstimates?.gasPrice;
    }
  }

  if (legacy) {
    return getLegacyTransactionData({
      gas: {
        suggestedGasLimit: gasObjectLegacy?.legacyGasLimit || suggestedGasLimit,
        suggestedGasPrice,
      },
      contractExchangeRates,
      conversionRate,
      currentCurrency,
      transactionState,
      ticker,
      onlyGas,
      multiLayerL1FeeTotal,
    });
  }

  return getEIP1559TransactionData({
    gas: {
      ...(gasSelected
        ? gasFeeEstimates[gasSelected]
        : {
            suggestedMaxFeePerGas: gasObject?.suggestedMaxFeePerGas,
            suggestedMaxPriorityFeePerGas:
              gasObject?.suggestedMaxPriorityFeePerGas,
          }),
      suggestedGasLimit,
      selectedOption: gasSelected,
    },
    gasFeeEstimates,
    transactionState,
    contractExchangeRates,
    conversionRate,
    currentCurrency,
    nativeCurrency: ticker,
    suggestedGasLimit,
    onlyGas,
  });
};
