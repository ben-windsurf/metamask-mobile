import { TRIGGER_TYPES } from '@metamask/notification-services-controller/notification-services';
import { strings } from '../../../../../locales/i18n';
import { ModalFieldType, ModalFooterType } from '../../constants';
import { ExtractedNotification, isOfTypeNodeGuard } from '../node-guard';
import { NotificationState } from '../types/NotificationState';
import {
  getAmount,
  getNativeTokenDetailsByChainId,
  getNotificationBadge,
} from '../../methods/common';
import { getTokenAmount, getTokenUSDAmount } from '../token-amounts';

/**
 * Type definition for swap completed notification data structure.
 * Represents a notification triggered when a MetaMask swap transaction is completed.
 */
type SwapCompletedNotification =
  ExtractedNotification<TRIGGER_TYPES.METAMASK_SWAP_COMPLETED>;

/**
 * Type guard function to check if a notification is a swap completed notification.
 * @param notification - The notification to check
 * @returns True if the notification is of type METAMASK_SWAP_COMPLETED
 */
const isSwapCompletedNotification = isOfTypeNodeGuard([
  TRIGGER_TYPES.METAMASK_SWAP_COMPLETED,
]);

/**
 * Notification state configuration for swap completed notifications.
 * Defines how swap completed notifications are displayed in menu items and modal details.
 * Includes token swap information, amounts, rates, and transaction details.
 */
const state: NotificationState<SwapCompletedNotification> = {
  guardFn: isSwapCompletedNotification,
  createMenuItem: (notification) => ({
    title: strings(`notifications.menu_item_title.${notification.type}`, {
      symbolIn: notification.data.token_in.symbol,
      symbolOut: notification.data.token_out.symbol,
    }),

    description: {
      start: notification.data.token_out.symbol,
      end: `${getAmount(
        notification.data.token_out.amount,
        notification.data.token_out.decimals,
        {
          shouldEllipse: true,
        },
      )} ${notification.data.token_out.symbol}`,
    },

    image: {
      url: notification.data.token_out.image,
    },

    badgeIcon: getNotificationBadge(notification.type),

    createdAt: notification.createdAt.toString(),
  }),
  createModalDetails: (notification) => {
    const nativeTokenDetails = getNativeTokenDetailsByChainId(
      notification.chain_id,
    );
    return {
      title: strings('notifications.modal.title_swapped', {
        symbolIn: notification.data.token_in.symbol,
        symbolOut: notification.data.token_out.symbol,
      }),
      createdAt: notification.createdAt.toString(),
      fields: [
        {
          type: ModalFieldType.ADDRESS,
          label: strings('notifications.modal.label_account'),
          address: notification.address,
        },
        {
          type: ModalFieldType.ASSET,
          label: strings('notifications.modal.label_swapped'),
          description: notification.data.token_in.symbol,
          amount: getTokenAmount(notification.data.token_in),
          usdAmount: getTokenUSDAmount(notification.data.token_in),
          tokenIconUrl: notification.data.token_in.image,
          tokenNetworkUrl: nativeTokenDetails?.image,
        },
        {
          type: ModalFieldType.ASSET,
          label: strings('notifications.modal.label_to'),
          description: notification.data.token_out.symbol,
          amount: getTokenAmount(notification.data.token_out),
          usdAmount: getTokenUSDAmount(notification.data.token_out),
          tokenIconUrl: notification.data.token_out.image,
          tokenNetworkUrl: nativeTokenDetails?.image,
        },
        {
          type: ModalFieldType.TRANSACTION,
          txHash: notification.tx_hash,
        },
        {
          type: ModalFieldType.NETWORK,
          iconUrl: nativeTokenDetails?.image,
          name: nativeTokenDetails?.name,
        },
        {
          type: ModalFieldType.SWAP_RATE,
          rate: `1 ${notification.data.token_out.symbol} ≈ ${(
            1 / parseFloat(notification.data.rate)
          ).toFixed(5)} ${notification.data.token_in.symbol}`,
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
