import { TRIGGER_TYPES } from '@metamask/notification-services-controller/notification-services';
import { strings } from '../../../../../locales/i18n';
import {
  ModalFieldType,
  ModalFooterType,
  ModalHeaderType,
} from '../../constants';
import { ExtractedNotification, isOfTypeNodeGuard } from '../node-guard';
import {
  label_address_from,
  label_address_to,
  NotificationState,
} from '../types/NotificationState';
import {
  getNativeTokenDetailsByChainId,
  getNotificationBadge,
} from '../../methods/common';
import { ModalField } from '../types/NotificationModalDetails';
import { formatAddress } from '../../../address';

/**
 * Type definition for ERC1155 notification data structure.
 * Represents notifications for ERC1155 token transfers (sent or received).
 */
type ERC1155Notification = ExtractedNotification<
  TRIGGER_TYPES.ERC1155_RECEIVED | TRIGGER_TYPES.ERC1155_SENT
>;

/**
 * Type guard function to check if a notification is an ERC1155 notification.
 * @param notification - The notification to check
 * @returns True if the notification is an ERC1155 sent or received notification
 */
const isERC1155Notification = isOfTypeNodeGuard([
  TRIGGER_TYPES.ERC1155_RECEIVED,
  TRIGGER_TYPES.ERC1155_SENT,
]);

/**
 * Determines if an ERC1155 notification represents a sent transaction.
 * @param n - The ERC1155 notification to check
 * @returns True if the notification is for a sent ERC1155 token
 */
const isSent = (n: ERC1155Notification) =>
  n.type === TRIGGER_TYPES.ERC1155_SENT;

/**
 * Generates the title text for an ERC1155 notification menu item.
 * @param n - The ERC1155 notification
 * @returns Localized title string with formatted address
 */
const title = (n: ERC1155Notification) => {
  const address = formatAddress(isSent(n) ? n.data.to : n.data.from, 'short');
  return strings(`notifications.menu_item_title.${n.type}`, {
    address,
  });
};

/**
 * Generates the modal title for an ERC1155 notification.
 * @param n - The ERC1155 notification
 * @returns Localized modal title string for sent or received NFT
 */
const modalTitle = (n: ERC1155Notification) =>
  isSent(n)
    ? strings('notifications.modal.title_sent', { symbol: 'NFT' })
    : strings('notifications.modal.title_received', {
        symbol: 'NFT',
      });

/**
 * Notification state configuration for ERC1155 token transfers.
 * Defines how ERC1155 notifications are displayed in menu items and modal details.
 */
const state: NotificationState<ERC1155Notification> = {
  guardFn: isERC1155Notification,
  createMenuItem: (notification) => ({
    title: title(notification),

    description: {
      start: notification.data.nft?.collection.name || '',
      end:
        notification.data.nft?.token_id && `#${notification.data.nft.token_id}`,
    },

    image: {
      url: notification.data.nft?.image,
      variant: 'square',
    },

    badgeIcon: getNotificationBadge(notification.type),

    createdAt: notification.createdAt.toString(),
  }),
  createModalDetails: (notification) => {
    const nativeTokenDetails = getNativeTokenDetailsByChainId(
      notification.chain_id,
    );

    const collectionField: ModalField[] = notification.data.nft?.collection
      ? [
          {
            type: ModalFieldType.NFT_COLLECTION_IMAGE,
            collectionName: notification.data.nft.collection.name,
            collectionImageUrl: notification.data.nft.collection.image,
            networkBadgeUrl: nativeTokenDetails?.image,
          },
        ]
      : [];
    return {
      title: modalTitle(notification),
      createdAt: notification.createdAt.toString(),
      header: {
        type: ModalHeaderType.NFT_IMAGE,
        nftImageUrl: notification.data.nft?.image ?? '',
        networkBadgeUrl: nativeTokenDetails?.image,
      },
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
        ...collectionField,
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
