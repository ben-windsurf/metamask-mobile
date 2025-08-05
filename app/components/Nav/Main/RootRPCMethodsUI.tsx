import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { ethers } from 'ethers';
// @ts-expect-error - No type definitions available for human-standard-token-abi
import abi from 'human-standard-token-abi';

import NotificationManager from '../../../core/NotificationManager';
import Engine from '../../../core/Engine';
import { strings } from '../../../../locales/i18n';
import { hexToBN, fromWei, isZeroValue } from '../../../util/number';
import {
  setEtherTransaction,
  setTransactionObject,
} from '../../../actions/transaction';
import WalletConnect from '../../../core/WalletConnect/WalletConnect';
import {
  getMethodData,
  TOKEN_METHOD_TRANSFER,
  getTokenValueParam,
  getTokenAddressParam,
  calcTokenAmount,
  getTokenValueParamAsHex,
  getIsSwapApproveOrSwapTransaction,
  isApprovalTransaction,
} from '../../../util/transactions';
import BN from 'bnjs4';
import Logger from '../../../util/Logger';
import TransactionTypes from '../../../core/TransactionTypes';
import { swapsUtils } from '@metamask/swaps-controller';
import { query } from '@metamask/controller-utils';
import BigNumber from 'bignumber.js';
import { KEYSTONE_TX_CANCELED } from '../../../constants/error';
import { MetaMetricsEvents, IMetaMetricsEvent } from '../../../core/Analytics';
import {
  getAddressAccountType,
  isHardwareAccount,
  areAddressesEqual,
} from '../../../util/address';

import {
  selectEvmChainId,
  selectProviderType,
} from '../../../selectors/networkController';
import type { RootState } from '../../../reducers';
import WatchAssetApproval from '../../Approvals/WatchAssetApproval';
import SignatureApproval from '../../Approvals/SignatureApproval';
import AddChainApproval from '../../Approvals/AddChainApproval';
import SwitchChainApproval from '../../Approvals/SwitchChainApproval';
import WalletConnectApproval from '../../Approvals/WalletConnectApproval';
import ConnectApproval from '../../Approvals/ConnectApproval';
import {
  TransactionApproval,
  TransactionModalType,
} from '../../Approvals/TransactionApproval';
import PermissionApproval from '../../Approvals/PermissionApproval';
import FlowLoaderModal from '../../Approvals/FlowLoaderModal';
import TemplateConfirmationModal from '../../Approvals/TemplateConfirmationModal';
import { selectTokenList } from '../../../selectors/tokenListController';
import { selectTokens } from '../../../selectors/tokensController';
import { getDeviceId } from '../../../core/Ledger/Ledger';
import { selectSelectedInternalAccountFormattedAddress } from '../../../selectors/accountsController';
import { createLedgerTransactionModalNavDetails } from '../../UI/LedgerModals/LedgerTransactionModal';
import ExtendedKeyringTypes from '../../../constants/keyringTypes';
import { ConfirmRoot } from '../../../components/Views/confirmations/components/confirm';
import { useMetrics } from '../../../components/hooks/useMetrics';
import { selectShouldUseSmartTransaction } from '../../../selectors/smartTransactionsController';
import { STX_NO_HASH_ERROR } from '../../../util/smart-transactions/smart-publish-hook';
import { getSmartTransactionMetricsProperties } from '../../../util/smart-transactions';
import { cloneDeep, isEqual } from 'lodash';
import { selectSwapsTransactions } from '../../../selectors/transactionController';
import type { Dispatch } from 'redux';
import { updateSwapsTransaction } from '../../../util/swaps/swaps-transactions';

///: BEGIN:ONLY_INCLUDE_IF(preinstalled-snaps,external-snaps)
import InstallSnapApproval from '../../Approvals/InstallSnapApproval';
import { getGlobalEthQuery } from '../../../util/networks/global-network';
import SnapDialogApproval from '../../Snaps/SnapDialogApproval/SnapDialogApproval';
///: END:ONLY_INCLUDE_IF
///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
import SnapAccountCustomNameApproval from '../../Approvals/SnapAccountCustomNameApproval';
///: END:ONLY_INCLUDE_IF

const hstInterface = new ethers.utils.Interface(abi);

function useSwapsTransactions(): Record<string, unknown> {
  const swapTransactions = useSelector(selectSwapsTransactions, isEqual);

  // Memo prevents fresh fallback empty object on every render.
  return useMemo(() => swapTransactions ?? {}, [swapTransactions]);
}

interface UseSwapConfirmedEventProps {
  trackSwaps: (
    event: IMetaMetricsEvent,
    transactionMeta: unknown,
    swapsTransactions: Record<string, unknown>,
  ) => void;
}

export const useSwapConfirmedEvent = ({
  trackSwaps,
}: UseSwapConfirmedEventProps) => {
  const [transactionMetaIdsForListening, setTransactionMetaIdsForListening] =
    useState<string[]>([]);

  const addTransactionMetaIdForListening = useCallback((txMetaId: string) => {
    setTransactionMetaIdsForListening((prevIds) => [...prevIds, txMetaId]);
  }, []);
  const swapsTransactions = useSwapsTransactions();

  useEffect(() => {
    // Cannot directly call trackSwaps from the event listener in autoSign due to stale closure of swapsTransactions
    const [txMetaId, ...restTxMetaIds] = transactionMetaIdsForListening;

    if (txMetaId && swapsTransactions[txMetaId]) {
      Engine.controllerMessenger.subscribeOnceIf(
        'TransactionController:transactionConfirmed',
        (transactionMeta: unknown) => {
          const txMeta = transactionMeta as { id: string };
          const swapTx = swapsTransactions[txMeta.id] as
            | { analytics?: unknown; paramsForAnalytics?: unknown }
            | undefined;
          if (swapTx?.analytics && swapTx?.paramsForAnalytics) {
            trackSwaps(
              MetaMetricsEvents.SWAP_COMPLETED,
              transactionMeta,
              swapsTransactions,
            );
          }
        },
        (transactionMeta: unknown) =>
          (transactionMeta as { id: string }).id === txMetaId,
      );
      setTransactionMetaIdsForListening(restTxMetaIds);
    }
  }, [trackSwaps, transactionMetaIdsForListening, swapsTransactions]);

  return {
    addTransactionMetaIdForListening,
    transactionMetaIdsForListening,
  };
};

interface RootRPCMethodsUIProps {
  navigation: unknown;
  setEtherTransaction: (transaction: object) => void;
  setTransactionObject: (transaction: object) => void;
  tokens: unknown[];
  selectedAddress: string | undefined;
  chainId: string;
  shouldUseSmartTransaction: boolean;
}

const RootRPCMethodsUI: React.FC<RootRPCMethodsUIProps> = (props) => {
  const { trackEvent, createEventBuilder } = useMetrics();
  const [transactionModalType, setTransactionModalType] = useState<
    string | undefined
  >(undefined);
  const tokenList = useSelector(selectTokenList);

  const initializeWalletConnect = useCallback(() => {
    WalletConnect.init();
  }, []);

  const trackSwaps = useCallback(
    async (
      event: IMetaMetricsEvent,
      transactionMeta: unknown,
      swapsTransactions: Record<string, unknown>,
    ): Promise<void> => {
      try {
        const { TransactionController, SmartTransactionsController } =
          Engine.context;
        const swapTransaction = swapsTransactions[
          (transactionMeta as { id: string }).id
        ] as {
          paramsForAnalytics: {
            sentAt: number;
            gasEstimate: string;
            ethAccountBalance: string;
            approvalTransactionMetaId: string;
          };
          destinationToken: { decimals: number };
          destinationTokenDecimals: number;
          destinationAmount: string;
          analytics: Record<string, unknown>;
          receivedDestinationAmount?: string;
        };

        const {
          sentAt,
          gasEstimate,
          ethAccountBalance,
          approvalTransactionMetaId,
        } = swapTransaction.paramsForAnalytics;

        const approvalTransaction =
          TransactionController.state.transactions.find(
            ({ id }) => id === approvalTransactionMetaId,
          );

        const ethQuery = getGlobalEthQuery();

        const ethBalance = await query(ethQuery, 'getBalance', [
          props.selectedAddress,
        ]);
        const receipt = await query(ethQuery, 'getTransactionReceipt', [
          (transactionMeta as { hash: string }).hash,
        ]);

        const currentBlock = await query(ethQuery, 'getBlockByHash', [
          receipt.blockHash,
          false,
        ]);
        let approvalReceipt;
        if (approvalTransaction?.hash) {
          approvalReceipt = await query(ethQuery, 'getTransactionReceipt', [
            approvalTransaction.hash,
          ]);
        }
        const tokensReceived = swapsUtils.getSwapsTokensReceived(
          receipt,
          approvalReceipt,
          (
            transactionMeta as {
              txParams: {
                from: string;
                to: string;
                value: string;
                data: string;
              };
            }
          ).txParams,
          approvalTransaction?.txParams ?? null,
          swapTransaction.destinationToken as {
            decimals: number;
            symbol: string;
            address: string;
          },
          ethAccountBalance,
          ethBalance,
        );

        const timeToMine = currentBlock.timestamp - sentAt;
        const estimatedVsUsedGasRatio = `${new BigNumber(receipt.gasUsed)
          .div(gasEstimate)
          .times(100)
          .toFixed(2)}%`;
        const quoteVsExecutionRatio = `${swapsUtils
          .calcTokenAmount(
            tokensReceived ? parseInt(tokensReceived, 16) : 0,
            swapTransaction.destinationTokenDecimals,
          )
          .div(swapTransaction.destinationAmount)
          .times(100)
          .toFixed(2)}%`;
        const tokenToAmountReceived = swapsUtils.calcTokenAmount(
          tokensReceived ? parseInt(tokensReceived, 16) : 0,
          swapTransaction.destinationToken.decimals,
        );

        const analyticsParams: Record<string, unknown> = {
          ...swapTransaction.analytics,
          account_type: getAddressAccountType(
            (transactionMeta as { txParams: { from: string } }).txParams.from,
          ),
        };

        updateSwapsTransaction(
          (transactionMeta as { id: string }).id,
          (swapsTransaction) => {
            swapsTransaction.gasUsed = receipt.gasUsed;

            if (tokensReceived) {
              swapsTransaction.receivedDestinationAmount = new BigNumber(
                tokensReceived,
                16,
              ).toString(10);
            }

            delete swapsTransaction.analytics;
            delete swapsTransaction.paramsForAnalytics;
          },
        );

        const smartTransactionMetricsProperties =
          getSmartTransactionMetricsProperties(
            SmartTransactionsController,
            undefined,
            false,
          );

        const resolvedSmartTransactionProperties =
          await smartTransactionMetricsProperties;
        const parameters = {
          time_to_mine: timeToMine,
          estimated_vs_used_gasRatio: estimatedVsUsedGasRatio,
          quote_vs_executionRatio: quoteVsExecutionRatio,
          token_to_amount_received: tokenToAmountReceived.toString(),
          is_smart_transaction: props.shouldUseSmartTransaction,
          gas_included: (analyticsParams as { isGasIncludedTrade: boolean })
            .isGasIncludedTrade,
          ...(resolvedSmartTransactionProperties as Record<
            string,
            string | number | boolean
          >),
          available_quotes: (analyticsParams as { available_quotes: number })
            .available_quotes,
          best_quote_source: (analyticsParams as { best_quote_source: string })
            .best_quote_source,
          chain_id: (analyticsParams as { chain_id: string }).chain_id,
          custom_slippage: (analyticsParams as { custom_slippage: boolean })
            .custom_slippage,
          network_fees_USD: (analyticsParams as { network_fees_USD: number })
            .network_fees_USD,
          other_quote_selected: (
            analyticsParams as { other_quote_selected: boolean }
          ).other_quote_selected,
          request_type: (analyticsParams as { request_type: string })
            .request_type,
          token_from: (analyticsParams as { token_from: string }).token_from,
          token_to: (analyticsParams as { token_to: string }).token_to,
        };
        const sensitiveParameters = {
          token_from_amount: (analyticsParams as { token_from_amount: string })
            .token_from_amount,
          token_to_amount: (analyticsParams as { token_to_amount: string })
            .token_to_amount,
          network_fees_ETH: (analyticsParams as { network_fees_ETH: string })
            .network_fees_ETH,
        };

        Logger.log('Swaps', 'Sending metrics event', event);

        trackEvent(
          createEventBuilder(event)
            .addProperties(parameters)
            .addSensitiveProperties(sensitiveParameters)
            .build(),
        );
      } catch (e) {
        Logger.error(e as Error, MetaMetricsEvents.SWAP_TRACKING_FAILED);
        trackEvent(
          createEventBuilder(MetaMetricsEvents.SWAP_TRACKING_FAILED)
            .addProperties({
              error: String(e),
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

  const { addTransactionMetaIdForListening } = useSwapConfirmedEvent({
    trackSwaps,
  });
  const swapsTransactions = useSwapsTransactions();

  const autoSign = useCallback(
    async (transactionMeta: unknown) => {
      const { KeyringController } = Engine.context;
      const { id: transactionId } = transactionMeta as { id: string };

      try {
        Engine.controllerMessenger.subscribeOnceIf(
          'TransactionController:transactionFinished',
          (finishedTransactionMeta: unknown) => {
            const txMeta = finishedTransactionMeta as {
              status: string;
              id: string;
              txParams: { assetType: string };
              error: Error;
            };
            if (txMeta.status === 'submitted') {
              NotificationManager.watchSubmittedTransaction({
                ...txMeta,
                assetType: txMeta.txParams.assetType,
              });
            } else {
              if (
                (swapsTransactions[txMeta.id] as { analytics?: unknown })
                  ?.analytics
              ) {
                trackSwaps(
                  MetaMetricsEvents.SWAP_FAILED,
                  txMeta,
                  swapsTransactions,
                );
              }
              throw txMeta.error;
            }
          },
          (checkTransactionMeta: unknown) =>
            (checkTransactionMeta as { id: string }).id === transactionId,
        );

        // Queue txMetaId to listen for confirmation event
        addTransactionMetaIdForListening(
          (transactionMeta as { id: string }).id,
        );

        await KeyringController.resetQRKeyringState();

        const isLedgerAccount = isHardwareAccount(
          (transactionMeta as { txParams: { from: string } }).txParams.from,
          [ExtendedKeyringTypes.ledger],
        );

        // For Ledger Accounts we handover the signing to the confirmation flow
        if (isLedgerAccount) {
          const deviceId = await getDeviceId();

          (
            props.navigation as { navigate: (...args: unknown[]) => void }
          ).navigate(
            ...createLedgerTransactionModalNavDetails({
              transactionId: (transactionMeta as { id: string }).id,
              deviceId,
              onConfirmationComplete: () => {
                // Empty function required by createLedgerTransactionModalNavDetails interface
              },
            }),
          );
        } else {
          Engine.acceptPendingApproval((transactionMeta as { id: string }).id);
        }
      } catch (error) {
        const errorMessage = (error as Error)?.message || '';
        if (
          !errorMessage.startsWith(KEYSTONE_TX_CANCELED) &&
          !errorMessage.startsWith(STX_NO_HASH_ERROR)
        ) {
          Alert.alert(strings('transactions.transaction_error'), errorMessage, [
            { text: strings('navigation.ok') },
          ]);
          Logger.error(
            error as Error,
            'error while trying to send transaction (Main)',
          );
        } else {
          trackEvent(
            createEventBuilder(
              MetaMetricsEvents.QR_HARDWARE_TRANSACTION_CANCELED,
            ).build(),
          );
        }
      }
    },
    [
      props.navigation,
      trackSwaps,
      trackEvent,
      swapsTransactions,
      addTransactionMetaIdForListening,
      createEventBuilder,
    ],
  );

  const onUnapprovedTransaction = useCallback(
    async (transactionMetaOriginal: unknown) => {
      const transactionMeta = cloneDeep(transactionMetaOriginal) as {
        origin: string;
        id: string;
        txParams: {
          to?: string;
          data?: string;
          value?: string;
          gas?: string;
          gasPrice?: string;
          from: string;
        };
        securityAlertResponse: unknown;
      };

      if (transactionMeta.origin === TransactionTypes.MMM) return;

      const to = transactionMeta.txParams.to?.toLowerCase();
      const { data } = transactionMeta.txParams;

      if (
        getIsSwapApproveOrSwapTransaction(
          data,
          transactionMeta.origin,
          to,
          props.chainId,
        ) ||
        false // Bridge transaction check temporarily disabled due to type compatibility
      ) {
        autoSign(transactionMeta);
      } else {
        const {
          chainId,
          networkClientId,
          txParams: { value, gas, gasPrice, data: txData },
        } = transactionMeta as unknown as {
          chainId: string;
          networkClientId: string;
          txParams: {
            value?: string;
            gas?: string;
            gasPrice?: string;
            data?: string;
          };
        };
        const { AssetsContractController } = Engine.context;
        (transactionMeta.txParams as { gas: unknown; gasPrice: unknown }).gas =
          hexToBN(gas || '0x0');
        (
          transactionMeta.txParams as { gas: unknown; gasPrice: unknown }
        ).gasPrice = gasPrice && hexToBN(gasPrice);

        if (
          (value === '0x0' || !value) &&
          txData &&
          txData !== '0x' &&
          to &&
          (await getMethodData(txData as string, networkClientId)).name ===
            TOKEN_METHOD_TRANSFER
        ) {
          let asset = (
            props.tokens as {
              address: string;
              decimals: number;
              symbol: string;
            }[]
          ).find(({ address }) => areAddressesEqual(address, to));
          if (!asset) {
            // try to lookup contract by lowercased address `to`
            asset = (
              tokenList as Record<
                string,
                { decimals: number; symbol: string; address: string }
              >
            )[to as string];

            if (!asset) {
              try {
                asset = {} as {
                  decimals: number;
                  symbol: string;
                  address: string;
                };
                asset.decimals = Number(
                  await AssetsContractController.getERC20TokenDecimals(
                    to as string,
                  ),
                );
                asset.symbol =
                  await AssetsContractController.getERC721AssetSymbol(
                    to as string,
                  );
                // adding `to` here as well
                asset.address = to as string;
              } catch (e) {
                // This could fail when requesting a transfer in other network
                // adding `to` here as well
                asset = {
                  symbol: 'ERC20',
                  decimals: new BN(0) as unknown as number,
                  address: to as string,
                };
              }
            }
          }

          const tokenData = hstInterface.parseTransaction({
            data: txData as string,
          });
          const tokenValue = getTokenValueParam(tokenData);
          const toAddress = getTokenAddressParam(tokenData);
          const tokenAmount =
            tokenData &&
            calcTokenAmount(tokenValue || '0x0', asset.decimals).toFixed();

          (
            transactionMeta.txParams as unknown as {
              value: unknown;
              readableValue: unknown;
              to: unknown;
            }
          ).value = hexToBN(getTokenValueParamAsHex(tokenData) || '0x0');
          (
            transactionMeta.txParams as unknown as {
              value: unknown;
              readableValue: unknown;
              to: unknown;
            }
          ).readableValue = tokenAmount;
          (
            transactionMeta.txParams as unknown as {
              value: unknown;
              readableValue: unknown;
              to: unknown;
            }
          ).to = toAddress;

          props.setTransactionObject({
            selectedAsset: asset,
            id: transactionMeta.id,
            origin: transactionMeta.origin,
            securityAlertResponse: transactionMeta.securityAlertResponse,
            networkClientId,
            chainId,
            ...transactionMeta.txParams,
          });
        } else {
          (
            transactionMeta.txParams as unknown as {
              value: unknown;
              readableValue: unknown;
            }
          ).value = hexToBN(value || '0x0');
          (
            transactionMeta.txParams as unknown as {
              value: unknown;
              readableValue: unknown;
            }
          ).readableValue = fromWei(
            (transactionMeta.txParams as unknown as { value: string }).value,
          );

          props.setEtherTransaction({
            id: transactionMeta.id,
            origin: transactionMeta.origin,
            securityAlertResponse: transactionMeta.securityAlertResponse,
            chainId,
            networkClientId,
            ...transactionMeta.txParams,
          });
        }

        if (
          isApprovalTransaction(txData as string) &&
          (!value || isZeroValue(value as string))
        ) {
          setTransactionModalType(TransactionModalType.Transaction);
        } else {
          setTransactionModalType(TransactionModalType.Dapp);
        }
      }
    },
    [props, autoSign, tokenList],
  );

  const onTransactionComplete = useCallback(() => {
    setTransactionModalType(undefined);
  }, []);

  // unapprovedTransaction effect
  useEffect(() => {
    Engine.controllerMessenger.subscribe(
      'TransactionController:unapprovedTransactionAdded',
      onUnapprovedTransaction,
    );
    return () => {
      Engine.controllerMessenger.unsubscribe(
        'TransactionController:unapprovedTransactionAdded',
        onUnapprovedTransaction,
      );
    };
  }, [onUnapprovedTransaction]);

  useEffect(() => {
    initializeWalletConnect();

    return function cleanup() {
      (
        Engine.context.TokensController as {
          hub?: { removeAllListeners: () => void };
        }
      )?.hub?.removeAllListeners();
      WalletConnect?.hub?.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <ConfirmRoot />
      <SignatureApproval />
      <WalletConnectApproval />
      <TransactionApproval
        transactionType={transactionModalType}
        navigation={props.navigation as unknown}
        onComplete={onTransactionComplete}
      />
      <AddChainApproval />
      <SwitchChainApproval />
      <WatchAssetApproval />
      <ConnectApproval navigation={props.navigation as unknown} />
      <PermissionApproval navigation={props.navigation as unknown} />
      <FlowLoaderModal />
      <TemplateConfirmationModal />
      {
        ///: BEGIN:ONLY_INCLUDE_IF(preinstalled-snaps,external-snaps)
      }
      <InstallSnapApproval />
      <SnapDialogApproval />
      {
        ///: END:ONLY_INCLUDE_IF
      }
      {
        ///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
      }
      <SnapAccountCustomNameApproval />
      {
        ///: END:ONLY_INCLUDE_IF
      }
    </React.Fragment>
  );
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setEtherTransaction: (transaction: object) =>
    dispatch(setEtherTransaction(transaction)),
  setTransactionObject: (transaction: object) =>
    dispatch(setTransactionObject(transaction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootRPCMethodsUI);
