import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectDestToken,
  selectSourceToken,
} from '../../../../../core/redux/slices/bridge';
import { selectShouldUseSmartTransaction } from '../../../../../selectors/smartTransactionsController';

/**
 * Custom hook that provides unified context data for swap and bridge operations
 * Combines smart transaction settings with source and destination token information
 * @returns {Object} Context object containing smart transaction status, token symbols, and warning arrays
 */
export const useUnifiedSwapBridgeContext = () => {
  const smartTransactionsEnabled = useSelector(selectShouldUseSmartTransaction);
  const fromToken = useSelector(selectSourceToken);
  const toToken = useSelector(selectDestToken);

  return useMemo(
    () => ({
      stx_enabled: smartTransactionsEnabled,
      token_symbol_source: fromToken?.symbol ?? '',
      token_symbol_destination: toToken?.symbol ?? '',
      security_warnings: [], // TODO
      warnings: [], // TODO
    }),
    [smartTransactionsEnabled, fromToken, toToken],
  );
};
