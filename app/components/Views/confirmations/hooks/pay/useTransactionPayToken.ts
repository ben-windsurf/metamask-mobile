import { useDispatch, useSelector } from 'react-redux';
import {
  TransactionPayToken,
  selectTransactionPayToken,
  setTransactionPayToken,
} from '../../../../../core/redux/slices/confirmationMetrics';
import { useTransactionMetadataRequest } from '../transactions/useTransactionMetadataRequest';
import { EMPTY_ADDRESS } from '../../../../../constants/transaction';
import { useCallback } from 'react';
import { RootState } from '../../../../../reducers';
import { Hex } from '@metamask/utils';

/**
 * Custom hook for managing transaction payment token selection and state
 * Provides functionality to get and set the payment token for a specific transaction
 * Used in confirmation flows to handle token selection for transaction payments
 * @returns {Object} Object containing current payToken and setPayToken function
 * @returns {TransactionPayToken} returns.payToken - Current payment token with address and chainId
 * @returns {Function} returns.setPayToken - Function to update the payment token for the transaction
 */
export function useTransactionPayToken() {
  const dispatch = useDispatch();

  const { chainId: transactionChainId, id: transactionId } =
    useTransactionMetadataRequest() || {};

  const selectedPayToken = useSelector((state: RootState) =>
    selectTransactionPayToken(state, transactionId as string),
  );

  const defaultPayToken: TransactionPayToken = {
    address: EMPTY_ADDRESS,
    chainId: transactionChainId as Hex,
  };

  const setPayToken = useCallback(
    (payToken: TransactionPayToken) => {
      dispatch(
        setTransactionPayToken({
          transactionId: transactionId as string,
          payToken,
        }),
      );
    },
    [dispatch, transactionId],
  );

  const payToken = selectedPayToken ?? defaultPayToken;

  return {
    payToken,
    setPayToken,
  };
}
