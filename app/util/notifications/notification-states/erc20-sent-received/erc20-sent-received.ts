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
  getAmount,
  getNativeTokenDetailsByChainId,
  getNotificationBadge,
} from '../../methods/common';
import { getTokenAmount, getTokenUSDAmount } from '../token-amounts';
import { formatAddress } from '../../../address';

/**
 * Type definition for ERC20 token notifications (sent or received).
 */
type ERC20Notification = ExtractedNotification<
  TRIGGER_TYPES.ERC20_RECEIVED | TRIGGER_TYPES.ERC20_SENT
>;

/**
 * Type guard function to check if a notification is an ERC20 token notification.
 * @returns True if the notification is an ERC20 sent or received notification
 */
const isERC20Notification = isOfTypeNodeGuard([
  TRIGGER_TYPES.ERC20_RECEIVED,
  TRIGGER_TYPES.ERC20_SENT,
]);

/**
 * Determines if an ERC20 notification represents a sent transaction.
 * @param n - The ERC20 notification to check
 * @returns True if the notification is for a sent transaction
 */
const isSent = (n: ERC20Notification) => n.type === TRIGGER_TYPES.ERC20_SENT;

/**
 * Generates the menu title for an ERC20 notification.
 * @param n - The ERC20 notification
 * @returns Localized menu title string with formatted address
 */
const menuTitle = (n: ERC20Notification) => {
  const address = formatAddress(isSent(n) ? n.data.to : n.data.from, 'short');
  return strings(`notifications.menu_item_title.${n.type}`, {
    address,
  });
};

/**
 * Generates the modal title for an ERC20 notification.
 * @param n - The ERC20 notification
 * @returns Localized modal title string with token symbol
 */
const modalTitle = (n: ERC20Notification) =>
  isSent(n)
    ? strings('notifications.modal.title_sent', { symbol: n.data.token.symbol })
    : strings('notifications.modal.title_received', {
        symbol: n.data.token.symbol,
      });

/**
 * Notification state configuration for ERC20 token transactions.
 * Defines how ERC20 sent/received notifications are displayed in menus and modals.
 */
const state: NotificationState<ERC20Notification> = {
  guardFn: isERC20Notification,
  createMenuItem: (notification) => ({
    title: menuTitle(notification),

    description: {
      start: notification.data.token.name,
      end: `${getAmount(
        notification.data.token.amount,
        notification.data.token.decimals,
        {
          shouldEllipse: true,
        },
      )} ${notification.data.token.symbol}`,
    },

    image: {
      url: notification.data.token.image,
    },

    badgeIcon: getNotificationBadge(notification.type),

    createdAt: notification.createdAt.toString(),
  }),
  createModalDetails: (notification) => {
    const nativeTokenDetails = getNativeTokenDetailsByChainId(
      notification.chain_id,
    );
    return {
      title: modalTitle(notification),
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
          description: notification.data.token.name,
          amount: getTokenAmount(notification.data.token),
          usdAmount: getTokenUSDAmount(notification.data.token),
          tokenIconUrl: notification.data.token.image,
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
