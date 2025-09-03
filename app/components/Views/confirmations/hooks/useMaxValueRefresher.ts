import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { add0x, Hex } from '@metamask/utils';
import { BigNumber } from 'bignumber.js';
import {
  TransactionType,
  type TransactionMeta,
} from '@metamask/transaction-controller';
import { useTransactionMetadataRequest } from './transactions/useTransactionMetadataRequest';
import { useFeeCalculations } from './gas/useFeeCalculations';
import { useAccountNativeBalance } from './useAccountNativeBalance';
import { selectTransactionState } from '../../../../reducers/transaction';
import { updateEditableParams } from '../../../../util/transaction-controller';
import { useConfirmationContext } from '../context/confirmation-context';

/**
 * Custom hook that refreshes the maximum transaction value when in max amount mode
 * Automatically recalculates and updates the transaction value by subtracting gas fees from the account balance
 * Only applies to simpleSend transaction types to ensure accurate maximum sendable amounts
 * @returns {void} This hook manages state internally and doesn't return any values
 */
export function useMaxValueRefresher() {
  const { maxValueMode } = useSelector(selectTransactionState);
  const [valueJustUpdated, setValueJustUpdated] = useState(false);
  const { setIsTransactionValueUpdating } = useConfirmationContext();
  const transactionMetadata = useTransactionMetadataRequest();
  const { chainId, id, txParams, type } =
    transactionMetadata as TransactionMeta;
  const { preciseNativeFeeInHex } = useFeeCalculations(
    transactionMetadata as TransactionMeta,
  );
  const { balanceWeiInHex } = useAccountNativeBalance(chainId, txParams.from);

  useEffect(() => {
    if (!maxValueMode || type !== TransactionType.simpleSend) {
      // Not compatible with transaction value refresh logic
      return;
    }

    const balance = new BigNumber(balanceWeiInHex);
    const fee = new BigNumber(preciseNativeFeeInHex as Hex);
    const maxValue = balance.minus(fee);
    const maxValueHex = add0x(maxValue.toString(16));
    const shouldUpdate = maxValueHex !== txParams.value;

    if (shouldUpdate && maxValue.isPositive()) {
      setIsTransactionValueUpdating(true);
      updateEditableParams(id, {
        value: maxValueHex,
      });
      setValueJustUpdated(true);
    }
  }, [
    balanceWeiInHex,
    id,
    maxValueMode,
    preciseNativeFeeInHex,
    setIsTransactionValueUpdating,
    txParams,
    type,
  ]);

  useEffect(() => {
    if (valueJustUpdated) {
      // This will run in the next render cycle after the update
      setIsTransactionValueUpdating(false);
      setValueJustUpdated(false);
    }
  }, [valueJustUpdated, setIsTransactionValueUpdating]);
}
