import { TRIGGER_TYPES } from '@metamask/notification-services-controller/notification-services';
import { ModalFieldType, ModalHeaderType } from '../../constants';
import { ExtractedNotification, isOfTypeNodeGuard } from '../node-guard';
import { NotificationState } from '../types/NotificationState';
import { getNotificationBadge } from '../../methods/common';
import METAMASK_FOX from '../../../../images/branding/fox.png';

/**
 * Type definition for feature announcement notifications.
 * Represents a notification extracted from the FEATURES_ANNOUNCEMENT trigger type.
 */
type FeatureAnnouncementNotification =
  ExtractedNotification<TRIGGER_TYPES.FEATURES_ANNOUNCEMENT>;

/**
 * Type guard function to check if a notification is a feature announcement.
 * Uses node guard pattern to validate notification type.
 *
 * @returns Function that validates if notification matches FEATURES_ANNOUNCEMENT trigger type
 */
const isFeatureAnnouncementNotification = isOfTypeNodeGuard([
  TRIGGER_TYPES.FEATURES_ANNOUNCEMENT,
]);

/**
 * Notification state configuration for feature announcement notifications.
 * Defines how feature announcements are displayed in menu items and modal details.
 * Includes guard function, menu item creation, and modal detail creation logic.
 */
const state: NotificationState<FeatureAnnouncementNotification> = {
  guardFn: isFeatureAnnouncementNotification,
  createMenuItem: (notification) => ({
    title: notification.data.title,

    description: {
      start: notification.data.shortDescription,
    },

    image: {
      url: METAMASK_FOX,
    },

    badgeIcon: getNotificationBadge(notification.type),

    createdAt: notification.createdAt.toString(),
  }),
  createModalDetails: (notification) => ({
    title: notification.data.title,
    createdAt: notification.createdAt.toString(),
    header: {
      type: ModalHeaderType.ANNOUNCEMENT_IMAGE,
      imageUrl: `https:${notification.data.image.url}?fm=jpg&fl=progressive&w=1000&q=80`,
    },
    fields: [
      {
        type: ModalFieldType.ANNOUNCEMENT_DESCRIPTION,
        description: notification.data.longDescription,
      },
    ],
    /**
     * TODO support mobile links
     * GH Issue: https://github.com/MetaMask/metamask-mobile/issues/10377
     * */
  }),
};

export default state;
