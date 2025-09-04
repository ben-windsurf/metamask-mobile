import { TRIGGER_TYPES } from '@metamask/notification-services-controller/notification-services';
import { strings } from '../../../../../locales/i18n';
import { ModalFieldType, ModalFooterType } from '../../constants';
import { ExtractedNotification, isOfTypeNodeGuard } from '../node-guard';
import {
  label_address_from,
  label_address_to,
  NotificationState,
} from '../types/NotificationState';
import {
  getNativeTokenDetailsByChainId,
  getNotificationBadge,
  formatAmount,
} from '../../methods/common';
import { formatAddress } from '../../../address';

/**
 * Type definition for native ETH sent/received notifications
 */
type NativeSentReceiveNotification = ExtractedNotification<
  TRIGGER_TYPES.ETH_RECEIVED | TRIGGER_TYPES.ETH_SENT
>;

/**
 * Type guard function to check if a notification is a native token (ETH) notification
 */
const isNativeTokenNotification = isOfTypeNodeGuard([
  TRIGGER_TYPES.ETH_RECEIVED,
  TRIGGER_TYPES.ETH_SENT,
]);

/**
 * Determines if a notification represents a sent transaction
 * @param n - The native sent/receive notification to check
 * @returns True if the notification is for a sent transaction, false otherwise
 */
const isSent = (n: NativeSentReceiveNotification) =>
  n.type === TRIGGER_TYPES.ETH_SENT;

/**
 * Generates a localized title for the notification based on transaction type and address
 * @param n - The native sent/receive notification
 * @returns Formatted title string with address information
 */
const title = (n: NativeSentReceiveNotification) => {
  const address = formatAddress(isSent(n) ? n.data.to : n.data.from, 'short');
  return strings(`notifications.menu_item_title.${n.type}`, {
    address,
  });
};

/**
 * Notification state configuration for ETH sent/received notifications
 * Defines how to create menu items and modal details for native token transactions
 */
const state: NotificationState<NativeSentReceiveNotification> = {
  guardFn: isNativeTokenNotification,
  createMenuItem: (notification) => {
    const tokenDetails = getNativeTokenDetailsByChainId(notification.chain_id);

    return {
      title: title(notification),

      description: {
        start: tokenDetails?.name ?? '',
        end: tokenDetails
          ? `${formatAmount(parseFloat(notification.data.amount.eth), {
              shouldEllipse: true,
            })} ${tokenDetails.symbol}`
          : '',
      },

      image: {
        url: tokenDetails?.image,
      },

      badgeIcon: getNotificationBadge(notification.type),

      createdAt: notification.createdAt.toString(),
    };
  },
  createModalDetails: (notification) => {
    const nativeTokenDetails = getNativeTokenDetailsByChainId(
      notification.chain_id,
    );
    return {
      title: isSent(notification)
        ? strings('notifications.modal.title_sent', {
            symbol: nativeTokenDetails?.symbol ?? '',
          })
        : strings('notifications.modal.title_received', {
            symbol: nativeTokenDetails?.symbol ?? '',
          }),
      createdAt: notification.createdAt.toString(),
      fields: [
        {
          type: ModalFieldType.ADDRESS,
          label: label_address_from(notification),
          address: notification.data.from,
        },
        {
          type: ModalFieldType.ADDRESS,
          label: label_address_to(notification),
          address: notification.data.to,
        },
        {
          type: ModalFieldType.TRANSACTION,
          txHash: notification.tx_hash,
        },
        {
          type: ModalFieldType.ASSET,
          label: strings('notifications.modal.label_asset'),
          description: nativeTokenDetails?.name ?? '',
          amount: `${formatAmount(parseFloat(notification.data.amount.eth), {
            shouldEllipse: true,
          })} ${nativeTokenDetails?.symbol}`,
          usdAmount: `$${formatAmount(
            parseFloat(notification.data.amount.usd),
            {
              shouldEllipse: true,
            },
          )}`,
          tokenIconUrl: nativeTokenDetails?.image,
          tokenNetworkUrl: nativeTokenDetails?.image,
        },
        {
          type: ModalFieldType.NETWORK,
          iconUrl: nativeTokenDetails?.image,
          name: nativeTokenDetails?.name,
        },
      ],
      footer: {
        type: ModalFooterType.BLOCK_EXPLORER,
        chainId: notification.chain_id,
        txHash: notification.tx_hash,
      },
    };
  },
};

export default state;
