import {
  TRIGGER_TYPES,
  INotification,
} from '@metamask/notification-services-controller/notification-services';
import { strings } from '../../../../../locales/i18n';
import { NotificationMenuItem } from './NotificationMenuItem';
import { NotificationModalDetails } from './NotificationModalDetails';
import { ExtractedNotification } from '../node-guard';

/**
 * Interface defining the structure for notification state handlers.
 * Provides methods for type guarding, menu item creation, and modal details generation.
 *
 * @template T - The specific notification type extending INotification
 */
export interface NotificationState<T extends INotification = INotification> {
  /** Type guard function to check if a notification matches the expected type */
  guardFn: (n: INotification) => n is T;
  /** Function to create a menu item representation of the notification */
  createMenuItem: (n: T) => NotificationMenuItem;
  /** Optional function to create modal details for the notification */
  createModalDetails?: (n: T) => NotificationModalDetails;
}

/** Notification type for ERC20 token transactions (sent or received) */
type ERC20Notification = ExtractedNotification<
  TRIGGER_TYPES.ERC20_RECEIVED | TRIGGER_TYPES.ERC20_SENT
>;
/** Notification type for ERC721 NFT transactions (sent or received) */
type ERC721Notification = ExtractedNotification<
  TRIGGER_TYPES.ERC721_RECEIVED | TRIGGER_TYPES.ERC721_SENT
>;

/** Notification type for ERC1155 multi-token transactions (sent or received) */
type ERC1155Notification = ExtractedNotification<
  TRIGGER_TYPES.ERC1155_RECEIVED | TRIGGER_TYPES.ERC1155_SENT
>;
/** Notification type for native ETH transactions (sent or received) */
type NativeSentReceiveNotification = ExtractedNotification<
  TRIGGER_TYPES.ETH_RECEIVED | TRIGGER_TYPES.ETH_SENT
>;

/** Union type representing any notification for sent or received transactions */
type SentReceivedNotification =
  | ERC20Notification
  | ERC721Notification
  | ERC1155Notification
  | NativeSentReceiveNotification;
const isSent = (
  n:
    | NativeSentReceiveNotification
    | ERC20Notification
    | ERC1155Notification
    | ERC721Notification,
) =>
  n.type === TRIGGER_TYPES.ETH_SENT ||
  n.type === TRIGGER_TYPES.ERC20_SENT ||
  n.type === TRIGGER_TYPES.ERC721_SENT ||
  n.type === TRIGGER_TYPES.ERC1155_SENT;

export const label_address_from = (n: SentReceivedNotification): string =>
  isSent(n)
    ? strings('notifications.modal.label_address_from_you')
    : strings('notifications.modal.label_address_from');

export const label_address_to = (n: SentReceivedNotification): string =>
  isSent(n)
    ? strings('notifications.modal.label_address_to')
    : strings('notifications.modal.label_address_to_you');
