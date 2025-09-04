import { TRIGGER_TYPES } from '@metamask/notification-services-controller/notification-services';
import { strings } from '../../../../../locales/i18n';
import { ModalFieldType, ModalFooterType } from '../../constants';
import { ExtractedNotification, isOfTypeNodeGuard } from '../node-guard';
import { NotificationState } from '../types/NotificationState';
import {
  formatAmount,
  getNativeTokenDetailsByChainId,
  getNotificationBadge,
} from '../../methods/common';

/**
 * Type definition for Lido stake ready to be withdrawn notification.
 * Represents a notification when staked ETH is ready for withdrawal from Lido.
 */
type LidoReadyWithDrawnNotification =
  ExtractedNotification<TRIGGER_TYPES.LIDO_STAKE_READY_TO_BE_WITHDRAWN>;

/**
 * Type guard function to check if a notification is a Lido ready to withdraw notification.
 * @returns Function that validates notification type
 */
const isLidoReadyWithDrawnNotification = isOfTypeNodeGuard([
  TRIGGER_TYPES.LIDO_STAKE_READY_TO_BE_WITHDRAWN,
]);

/**
 * Notification state configuration for Lido stake ready to be withdrawn notifications.
 * Defines how to display and handle notifications when staked ETH is ready for withdrawal.
 */
const state: NotificationState<LidoReadyWithDrawnNotification> = {
  guardFn: isLidoReadyWithDrawnNotification,
  createMenuItem: (notification) => ({
    title: strings(`notifications.menu_item_title.${notification.type}`),

    description: {
      start: strings(
        `notifications.menu_item_description.${notification.type}`,
        { symbol: notification.data.staked_eth.symbol },
      ),
    },

    image: {
      url: notification.data.staked_eth.image,
    },

    badgeIcon: getNotificationBadge(notification.type),

    createdAt: notification.createdAt.toString(),
  }),
  createModalDetails: (notification) => {
    const nativeTokenDetails = getNativeTokenDetailsByChainId(
      notification.chain_id,
    );

    return {
      title: strings('notifications.modal.title_untake_ready'),
      createdAt: notification.createdAt.toString(),
      fields: [
        {
          type: ModalFieldType.ADDRESS,
          label: strings('notifications.modal.label_account'),
          address: notification.address,
        },
        {
          type: ModalFieldType.ASSET,
          label: strings('notifications.modal.label_unstake_ready'),
          description: notification.data.staked_eth.symbol,
          amount: `${formatAmount(
            parseFloat(notification.data.staked_eth.amount),
            { shouldEllipse: true },
          )} ${notification.data.staked_eth.symbol}`,
          usdAmount: `$${formatAmount(
            parseFloat(notification.data.staked_eth.usd),
            { shouldEllipse: true },
          )}`,
          tokenIconUrl: notification.data.staked_eth.image,
          tokenNetworkUrl: nativeTokenDetails?.image,
        },
        {
          type: ModalFieldType.TRANSACTION,
          txHash: notification.tx_hash,
        },
        {
          type: ModalFieldType.STAKING_PROVIDER,
          stakingProvider: notification.data.staked_eth.symbol,
          tokenIconUrl: notification.data.staked_eth.image,
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
