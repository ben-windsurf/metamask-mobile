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
import { formatAddress } from '../../../address';

/**
 * Type definition for ERC721 notifications (sent or received NFT transactions)
 */
type ERC721Notification = ExtractedNotification<
  TRIGGER_TYPES.ERC721_RECEIVED | TRIGGER_TYPES.ERC721_SENT
>;

/**
 * Type guard function to check if a notification is an ERC721 notification
 */
const isERC721Notification = isOfTypeNodeGuard([
  TRIGGER_TYPES.ERC721_RECEIVED,
  TRIGGER_TYPES.ERC721_SENT,
]);

/**
 * Determines if an ERC721 notification is for a sent transaction
 * @param n - The ERC721 notification to check
 * @returns True if the notification is for a sent NFT, false if received
 */
const isSent = (n: ERC721Notification) => n.type === TRIGGER_TYPES.ERC721_SENT;

/**
 * Generates the title for an ERC721 notification menu item
 * @param n - The ERC721 notification
 * @returns Localized title string with formatted address
 */
const title = (n: ERC721Notification) => {
  const address = formatAddress(isSent(n) ? n.data.to : n.data.from, 'short');
  return strings(`notifications.menu_item_title.${n.type}`, {
    address,
  });
};

/**
 * Generates the modal title for an ERC721 notification
 * @param n - The ERC721 notification
 * @returns Localized modal title string for sent or received NFT
 */
const modalTitle = (n: ERC721Notification) =>
  isSent(n)
    ? strings('notifications.modal.title_sent', { symbol: 'NFT' })
    : strings('notifications.modal.title_received', {
        symbol: 'NFT',
      });

/**
 * Notification state configuration for ERC721 (NFT) sent and received notifications
 */
const state: NotificationState<ERC721Notification> = {
  guardFn: isERC721Notification,
  createMenuItem: (notification) => ({
    title: title(notification),

    description: {
      start: notification.data.nft.collection.name,
      end: `#${notification.data.nft.token_id}`,
    },

    image: {
      url: notification.data.nft.image,
      variant: 'square',
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
      header: {
        type: ModalHeaderType.NFT_IMAGE,
        nftImageUrl: notification.data.nft.image,
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
        {
          type: ModalFieldType.NFT_COLLECTION_IMAGE,
          collectionName: notification.data.nft.collection.name,
          collectionImageUrl: notification.data.nft.collection.image,
          networkBadgeUrl: nativeTokenDetails?.image,
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
