import Engine from '../../core/Engine';
import { MetaMetrics, MetaMetricsEvents } from '../../core/Analytics';
import { getAddressAccountType } from '../address';
import NotificationManager from '../../core/NotificationManager';
import { WALLET_CONNECT_ORIGIN } from '../walletconnect';
import AppConstants from '../../core/AppConstants';
import { InteractionManager } from 'react-native';
import { strings } from '../../../locales/i18n';
import { selectEvmChainId } from '../../selectors/networkController';
import { store } from '../../store';
import { getBlockaidMetricsParams } from '../blockaid';
import Device from '../device';
import { getDecimalChainId } from '../networks';
import Logger from '../Logger';
import { MetricsEventBuilder } from '../../core/Analytics/MetricsEventBuilder';

/**
 * Constants for different versions of typed data signing methods
 */
export const typedSign = {
  V1: 'eth_signTypedData',
  V3: 'eth_signTypedData_v3',
  V4: 'eth_signTypedData_v4',
};

/**
 * Extracts and formats analytics parameters for signature events
 * @param {Object} messageParams - The message parameters containing signature data
 * @param {string} signType - The type of signature being performed
 * @param {Object} securityAlertResponse - Security alert response from Blockaid
 * @returns {Object} Formatted analytics parameters for tracking
 */
export const getAnalyticsParams = (
  messageParams,
  signType,
  securityAlertResponse,
) => {
  if (!messageParams || typeof messageParams !== 'object') {
    throw new Error('Invalid messageParams provided');
  }

  const { currentPageInformation = {}, meta = {} } = messageParams;
  const pageInfo = { ...currentPageInformation, ...meta };

  const analyticsParams = {
    account_type: getAddressAccountType(messageParams.from),
    dapp_host_name: 'N/A',
    chain_id: null,
    signature_type: signType,
    version: messageParams?.version || 'N/A',
    ...pageInfo.analytics,
  };

  try {
    const chainId = selectEvmChainId(store.getState());
    analyticsParams.chain_id = getDecimalChainId(chainId);

    if (pageInfo.url) {
      const url = new URL(pageInfo.url);
      analyticsParams.dapp_host_name = url.host;
    }

    if (securityAlertResponse) {
      const blockaidParams = getBlockaidMetricsParams(securityAlertResponse);
      Object.assign(analyticsParams, blockaidParams);
    }
  } catch (error) {
    Logger.error(error, 'Error processing analytics parameters:');
  }

  return analyticsParams;
};

/**
 * Gets the appropriate notification title for WalletConnect signature events
 * @param {boolean} confirmation - Whether the signature was confirmed
 * @param {boolean} isError - Whether an error occurred during signing
 * @returns {string} Localized notification title
 */
export const walletConnectNotificationTitle = (confirmation, isError) => {
  if (isError) return strings('notifications.wc_signed_failed_title');
  return confirmation
    ? strings('notifications.wc_signed_title')
    : strings('notifications.wc_signed_rejected_title');
};

/**
 * Shows a notification for WalletConnect or SDK signature events
 * @param {Object} messageParams - Message parameters containing origin information
 * @param {boolean} confirmation - Whether the signature was confirmed
 * @param {boolean} isError - Whether an error occurred during signing
 */
export const showWalletConnectNotification = (
  messageParams = {},
  confirmation = false,
  isError = false,
) => {
  InteractionManager.runAfterInteractions(() => {
    /**
     * FIXME: need to rewrite the way BackgroundBridge sets the origin.
     */
    const origin = messageParams.origin.toLowerCase().replaceAll(':', '');
    const isWCOrigin = origin.startsWith(
      WALLET_CONNECT_ORIGIN.replaceAll(':', '').toLowerCase(),
    );
    const isSDKOrigin = origin.startsWith(
      AppConstants.MM_SDK.SDK_REMOTE_ORIGIN.replaceAll(':', '').toLowerCase(),
    );

    if (isWCOrigin || isSDKOrigin) {
      NotificationManager.showSimpleNotification({
        status: `simple_notification${!confirmation ? '_rejected' : ''}`,
        duration: 5000,
        title: walletConnectNotificationTitle(confirmation, isError),
        description: strings('notifications.wc_description'),
      });
    }
  });
};

/**
 * Handles signature action execution with analytics tracking and notifications
 * @param {Function} onAction - The action function to execute
 * @param {Object} messageParams - Message parameters for the signature
 * @param {string} signType - The type of signature being performed
 * @param {Object} securityAlertResponse - Security alert response from Blockaid
 * @param {boolean} confirmation - Whether the signature was confirmed
 */
export const handleSignatureAction = async (
  onAction,
  messageParams,
  signType,
  securityAlertResponse,
  confirmation,
) => {
  await onAction();
  showWalletConnectNotification(messageParams, confirmation);
  MetaMetrics.getInstance().trackEvent(
    MetricsEventBuilder.createEventBuilder(
      confirmation
        ? MetaMetricsEvents.SIGNATURE_APPROVED
        : MetaMetricsEvents.SIGNATURE_REJECTED,
    )
      .addProperties(
        getAnalyticsParams(messageParams, signType, securityAlertResponse),
      )
      .build(),
  );
};

/**
 * Adds an error listener for signature operations
 * @param {string} metamaskId - The MetaMask ID for the signature request
 * @param {Function} onSignatureError - Callback function to handle signature errors
 */
export const addSignatureErrorListener = (metamaskId, onSignatureError) => {
  Engine.context.SignatureController.hub.on(
    `${metamaskId}:signError`,
    onSignatureError,
  );
};

/**
 * Removes an error listener for signature operations
 * @param {string} metamaskId - The MetaMask ID for the signature request
 * @param {Function} onSignatureError - Callback function to remove from error listeners
 */
export const removeSignatureErrorListener = (metamaskId, onSignatureError) => {
  Engine.context.SignatureController.hub.removeListener(
    `${metamaskId}:signError`,
    onSignatureError,
  );
};

/**
 * Determines if a message should be truncated based on platform and layout height
 * @param {Object} e - Layout event object containing nativeEvent with layout information
 * @returns {boolean} True if the message should be truncated, false otherwise
 */
export const shouldTruncateMessage = (e) => {
  if (
    (Device.isIos() && e.nativeEvent.layout.height > 70) ||
    (Device.isAndroid() && e.nativeEvent.layout.height > 100)
  ) {
    return true;
  }

  return false;
};
