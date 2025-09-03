import { Hex } from '@metamask/utils';
import {
  IMetaMetricsEvent,
  ITrackingEvent,
} from '../../../../core/Analytics/MetaMetrics.types';
import { MetricsEventBuilder } from '../../../../core/Analytics/MetricsEventBuilder';
import Engine from '../../../../core/Engine';
import { TokenI } from '../types';
import NotificationManager from '../../../../core/NotificationManager';
import { MetaMetricsEvents } from '../../../hooks/useMetrics';
import Logger from '../../../../util/Logger';

interface RemoveEvmTokenProps {
  tokenToRemove: TokenI;
  currentChainId: string;
  trackEvent: (event: ITrackingEvent, saveDataRecording?: boolean) => void;
  strings: (key: string, args?: Record<string, unknown>) => string;
  getDecimalChainId: (chainId: string) => number;
  createEventBuilder: (event: IMetaMetricsEvent) => MetricsEventBuilder;
}

/**
 * Removes an EVM token from the user's token list by hiding it
 * Handles the token removal process including controller interaction, notifications, and analytics tracking
 * @param {RemoveEvmTokenProps} params - Token removal parameters
 * @param {TokenI} params.tokenToRemove - The token object to remove from the list
 * @param {string} params.currentChainId - The current chain ID
 * @param {Function} params.trackEvent - Function to track analytics events
 * @param {Function} params.strings - Localization function for getting translated strings
 * @param {Function} params.getDecimalChainId - Function to convert chain ID to decimal format
 * @param {Function} params.createEventBuilder - Function to create analytics event builders
 * @returns {Promise<void>} Promise that resolves when token removal is complete
 */
export const removeEvmToken = async ({
  tokenToRemove,
  currentChainId,
  trackEvent,
  strings,
  getDecimalChainId,
  createEventBuilder,
}: RemoveEvmTokenProps) => {
  const { TokensController, NetworkController } = Engine.context;
  const chainId = tokenToRemove?.chainId;
  const networkClientId = NetworkController.findNetworkClientIdByChainId(
    chainId as Hex,
  );
  const tokenAddress = tokenToRemove?.address || '';
  const symbol = tokenToRemove?.symbol || '';

  try {
    await TokensController.ignoreTokens([tokenAddress], networkClientId);

    NotificationManager.showSimpleNotification({
      status: `simple_notification`,
      duration: 5000,
      title: strings('wallet.token_toast.token_hidden_title'),
      description: strings('wallet.token_toast.token_hidden_desc', {
        tokenSymbol: symbol,
      }),
    });

    trackEvent(
      createEventBuilder(MetaMetricsEvents.TOKENS_HIDDEN)
        .addProperties({
          location: 'assets_list',
          token_standard: 'ERC20',
          asset_type: 'token',
          tokens: [`${symbol} - ${tokenAddress}`],
          chain_id: getDecimalChainId(currentChainId),
        })
        .build(),
    );
  } catch (err) {
    Logger.log(err, 'Wallet: Failed to hide token!');
  }
};
