import { useState, useEffect, useCallback, useMemo } from 'react';
import { connect, useSelector } from 'react-redux';
import { isEqual } from 'lodash';

import Engine from '../../../core/Engine';
import {
  setEtherTransaction,
  setTransactionObject,
} from '../../../actions/transaction';
import {
  getMethodData,
  TOKEN_METHOD_TRANSFER,
  getTokenValueParam,
  calcTokenAmount,
} from '../../../util/transactions';
import Logger from '../../../util/Logger';
import { MetaMetricsEvents } from '../../../core/Analytics';
import {
  getAddressAccountType,
  isHardwareAccount,
} from '../../../util/address';
import { RootState } from '../../../reducers';
import { Token } from '@metamask/assets-controllers';
import { TransactionMeta } from '@metamask/transaction-controller';
import { useMetrics } from '../../hooks/useMetrics';
import { selectSelectedInternalAccountFormattedAddress } from '../../../selectors/accountsController';
import {
  selectEvmChainId,
  selectProviderType,
} from '../../../selectors/networkController';
import { selectTokens } from '../../../selectors/tokensController';
import { selectShouldUseSmartTransaction } from '../../../selectors/smartTransactionsController';
import { selectTokenList } from '../../../selectors/tokenListController';
import { selectSwapsTransactions } from '../../../selectors/transactionController';

interface RootRPCMethodsUIProps {
  navigation: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
  };
  setEtherTransaction: (transaction: Record<string, unknown>) => void;
  setTransactionObject: (transaction: Record<string, unknown>) => void;
  tokens: Token[];
  selectedAddress: string | undefined;
  chainId: string;
  providerType: string;
  shouldUseSmartTransaction: boolean;
}

interface SwapsTransactions {
  [key: string]: Record<string, unknown>;
}

interface UseSwapConfirmedEventProps {
  trackSwaps: (
    event: string | { toString(): string },
    transactionMeta: TransactionMeta,
    swapsTransactions: SwapsTransactions,
  ) => Promise<void>;
}

interface UseSwapConfirmedEventReturn {
  addTransactionMetaIdForListening: (txMetaId: string) => void;
  transactionMetaIdsForListening: string[];
}

function useSwapsTransactions(): SwapsTransactions {
  const swapTransactions = useSelector(selectSwapsTransactions, isEqual);

  return useMemo(() => swapTransactions ?? {}, [swapTransactions]);
}

export const useSwapConfirmedEvent = ({
  trackSwaps,
}: UseSwapConfirmedEventProps): UseSwapConfirmedEventReturn => {
  const [transactionMetaIdsForListening, setTransactionMetaIdsForListening] =
    useState<string[]>([]);

  const addTransactionMetaIdForListening = useCallback((txMetaId: string) => {
    setTransactionMetaIdsForListening((prevIds) => [...prevIds, txMetaId]);
  }, []);

  const swapsTransactions = useSwapsTransactions();

  useEffect(() => {
    if (transactionMetaIdsForListening.length === 0) {
      return;
    }

    const { TransactionController } = Engine.context;

    const handleTransactionConfirmed = async (
      transactionMeta: TransactionMeta,
    ) => {
      if (transactionMetaIdsForListening.includes(transactionMeta.id)) {
        await trackSwaps(
          MetaMetricsEvents.SWAP_COMPLETED,
          transactionMeta,
          swapsTransactions,
        );
        setTransactionMetaIdsForListening((prevIds) =>
          prevIds.filter((txMetaId) => txMetaId !== transactionMeta.id),
        );
      }
    };

    const handleTransactionFailed = async (
      transactionMeta: TransactionMeta,
    ) => {
      if (transactionMetaIdsForListening.includes(transactionMeta.id)) {
        await trackSwaps(
          MetaMetricsEvents.SWAP_FAILED,
          transactionMeta,
          swapsTransactions,
        );
        setTransactionMetaIdsForListening((prevIds) =>
          prevIds.filter((txMetaId) => txMetaId !== transactionMeta.id),
        );
      }
    };

    (TransactionController as Record<string, unknown>).hub.on(
      'transaction-confirmed',
      handleTransactionConfirmed,
    );
    (TransactionController as Record<string, unknown>).hub.on(
      'transaction-failed',
      handleTransactionFailed,
    );

    return () => {
      (TransactionController as Record<string, unknown>).hub.removeListener(
        'transaction-confirmed',
        handleTransactionConfirmed,
      );
      (TransactionController as Record<string, unknown>).hub.removeListener(
        'transaction-failed',
        handleTransactionFailed,
      );
    };
  }, [transactionMetaIdsForListening, trackSwaps, swapsTransactions]);

  return {
    addTransactionMetaIdForListening,
    transactionMetaIdsForListening,
  };
};

const RootRPCMethodsUI = (props: RootRPCMethodsUIProps) => {
  const { trackEvent, createEventBuilder } = useMetrics();
  const tokenList = useSelector(selectTokenList);
  const { setEtherTransaction: setEtherTx, setTransactionObject: setTxObject } =
    props;

  const trackSwaps = useCallback(
    async (
      event: string | { toString(): string },
      transactionMeta: TransactionMeta,
      swapsTransactions: SwapsTransactions,
    ) => {
      try {
        const { TransactionController } = Engine.context;
        const swapsTransaction = swapsTransactions[transactionMeta.id];
        const approvalTransactionMetaId =
          swapsTransaction.approvalTransactionMetaId as string;
        const approvalTransactionMeta =
          TransactionController.state.transactions.find(
            (tx: TransactionMeta) => tx.id === approvalTransactionMetaId,
          );

        trackEvent(
          createEventBuilder(event as string)
            .addProperties({
              token_from: (
                swapsTransaction.sourceToken as Record<string, unknown>
              )?.symbol as string,
              token_from_amount: swapsTransaction.sourceAmount as string,
              token_to: (
                swapsTransaction.destinationToken as Record<string, unknown>
              )?.symbol as string,
              token_to_amount: swapsTransaction.destinationAmount as string,
              request_type: swapsTransaction.type as string,
              slippage: swapsTransaction.slippage as number,
              custom_slippage: swapsTransaction.customSlippage as number,
              response_time: swapsTransaction.responseTime as number,
              best_quote_source: swapsTransaction.topAggId as string,
              available_quotes: swapsTransaction.numberOfQuotes as number,
              other_quote_selected:
                swapsTransaction.otherQuoteSelected as boolean,
              other_quote_selected_source:
                swapsTransaction.otherQuoteSelectedSource as string,
              gas_fees: swapsTransaction.gasEstimate as string,
              approval_gas_fees: approvalTransactionMeta?.txReceipt
                ?.gasUsed as string,
              is_hardware_wallet: props.selectedAddress
                ? isHardwareAccount(props.selectedAddress)
                : false,
              hardware_wallet_type: props.selectedAddress
                ? getAddressAccountType(props.selectedAddress)
                : '',
              stx_enabled: props.shouldUseSmartTransaction,
              current_stx_enabled: props.shouldUseSmartTransaction,
              stx_user_opt_in: props.shouldUseSmartTransaction,
            })
            .build(),
        );
      } catch (error) {
        Logger.error(error as Error, MetaMetricsEvents.SWAP_TRACKING_FAILED);
        trackEvent(
          createEventBuilder(MetaMetricsEvents.SWAP_TRACKING_FAILED)
            .addProperties({
              error_message: (error as Error).message,
            })
            .build(),
        );
      }
    },
    [
      props.selectedAddress,
      props.shouldUseSmartTransaction,
      trackEvent,
      createEventBuilder,
    ],
  );

  useSwapConfirmedEvent({
    trackSwaps,
  });

  const onUnapprovedTransaction = useCallback(
    async (transactionMeta: TransactionMeta) => {
      const to = transactionMeta.txParams.to?.toString().toLowerCase();
      const { data } = transactionMeta.txParams;

      if (!data) {
        setEtherTx({
          id: transactionMeta.id,
          from: transactionMeta.txParams.from,
          to,
          value: transactionMeta.txParams.value,
          gas: transactionMeta.txParams.gas,
          gasPrice: transactionMeta.txParams.gasPrice,
          data: transactionMeta.txParams.data,
        });
        return;
      }

      let tokenAmount: string | undefined;
      let tokenAddress: string | undefined;
      let tokenDecimals: number | undefined;
      let tokenSymbol: string | undefined;

      const methodData = await getMethodData(data, props.chainId);
      if (
        methodData.name === TOKEN_METHOD_TRANSFER ||
        methodData.name === 'approve'
      ) {
        const tokenData = (
          tokenList as Record<string, { symbol?: string; decimals?: number }>
        )[to || ''];
        tokenSymbol = tokenData?.symbol;
        tokenDecimals = tokenData?.decimals;
        tokenAddress = to;
        tokenAmount = getTokenValueParam(transactionMeta.txParams);
      }

      if (tokenSymbol && tokenDecimals && tokenAmount && tokenAddress) {
        const renderableTokenAmount = calcTokenAmount(
          tokenAmount,
          tokenDecimals,
        ).toString();
        setTxObject({
          type: 'INDIVIDUAL_TOKEN_TRANSACTION',
          id: transactionMeta.id,
          from: transactionMeta.txParams.from,
          to,
          value: transactionMeta.txParams.value,
          gas: transactionMeta.txParams.gas,
          gasPrice: transactionMeta.txParams.gasPrice,
          data: transactionMeta.txParams.data,
          tokenAmount: renderableTokenAmount,
          tokenSymbol,
          tokenAddress,
        });
      } else {
        setEtherTx({
          id: transactionMeta.id,
          from: transactionMeta.txParams.from,
          to,
          value: transactionMeta.txParams.value,
          gas: transactionMeta.txParams.gas,
          gasPrice: transactionMeta.txParams.gasPrice,
          data: transactionMeta.txParams.data,
        });
      }
    },
    [tokenList, setEtherTx, setTxObject, props.chainId],
  );

  useEffect(() => {
    (Engine.context.TransactionController as Record<string, unknown>).hub.on(
      'unapprovedTransaction',
      onUnapprovedTransaction,
    );

    return function cleanup() {
      (
        Engine.context.TransactionController as Record<string, unknown>
      ).hub.removeListener('unapprovedTransaction', onUnapprovedTransaction);
    };
  }, [onUnapprovedTransaction]);

  return null;
};

const mapStateToProps = (state: RootState) => ({
  selectedAddress: selectSelectedInternalAccountFormattedAddress(state),
  chainId: selectEvmChainId(state),
  tokens: selectTokens(state),
  providerType: selectProviderType(state),
  shouldUseSmartTransaction: selectShouldUseSmartTransaction(
    state,
    selectEvmChainId(state),
  ),
});

const mapDispatchToProps = (
  dispatch: (action: Record<string, unknown>) => Record<string, unknown>,
) => ({
  setEtherTransaction: (transaction: Record<string, unknown>) =>
    dispatch(setEtherTransaction(transaction)),
  setTransactionObject: (transaction: Record<string, unknown>) =>
    dispatch(setTransactionObject(transaction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootRPCMethodsUI);
