import {
  TRIGGER_TYPES,
  INotification,
} from '@metamask/notification-services-controller/notification-services';
import { strings } from '../../../../../locales/i18n';
import { NotificationMenuItem } from './NotificationMenuItem';
import { NotificationModalDetails } from './NotificationModalDetails';
import { ExtractedNotification } from '../node-guard';

export interface NotificationState<T extends INotification = INotification> {
  guardFn: (n: INotification) => n is T;
  createMenuItem: (n: T) => NotificationMenuItem;
  createModalDetails?: (n: T) => NotificationModalDetails;
}

type ERC20Notification = ExtractedNotification<
  TRIGGER_TYPES.ERC20_RECEIVED | TRIGGER_TYPES.ERC20_SENT
>;
type ERC721Notification = ExtractedNotification<
  TRIGGER_TYPES.ERC721_RECEIVED | TRIGGER_TYPES.ERC721_SENT
>;

type ERC1155Notification = ExtractedNotification<
  TRIGGER_TYPES.ERC1155_RECEIVED | TRIGGER_TYPES.ERC1155_SENT
>;
type NativeSentReceiveNotification = ExtractedNotification<
  TRIGGER_TYPES.ETH_RECEIVED | TRIGGER_TYPES.ETH_SENT
>;

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

/**
 * Gets the appropriate "from" address label for a notification based on whether it's sent or received
 * @param {SentReceivedNotification} n - The notification object
 * @returns {string} Localized string for the "from" address label
 */
export const label_address_from = (n: SentReceivedNotification): string =>
  isSent(n)
    ? strings('notifications.modal.label_address_from_you')
    : strings('notifications.modal.label_address_from');

/**
 * Gets the appropriate "to" address label for a notification based on whether it's sent or received
 * @param {SentReceivedNotification} n - The notification object
 * @returns {string} Localized string for the "to" address label
 */
export const label_address_to = (n: SentReceivedNotification): string =>
  isSent(n)
    ? strings('notifications.modal.label_address_to')
    : strings('notifications.modal.label_address_to_you');
