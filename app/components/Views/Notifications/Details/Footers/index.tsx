import React from 'react';
import type { ModalFooter } from '../../../../../util/notifications/notification-states/types/NotificationModalDetails';
import AnnouncementCtaFooter from './AnnouncementCtaFooter';
import BlockExplorerFooter from './BlockExplorerFooter';
import type { INotification } from '../../../../../util/notifications/types';

interface Props {
  modalFooter: ModalFooter;
  notification: INotification;
}

/**
 * ModalFooter component renders different footer types for notification modals
 * Conditionally displays BlockExplorerFooter or AnnouncementCtaFooter based on footer type
 * @param {Props} props - Component props
 * @param {ModalFooter} props.modalFooter - Footer configuration object with type and data
 * @param {INotification} props.notification - Notification data object
 * @returns {JSX.Element | null} The appropriate footer component or null if no match
 */
export default function ModalFooter({ modalFooter, notification }: Props) {
  if (modalFooter.type === 'ModalFooter-BlockExplorer')
    return <BlockExplorerFooter {...modalFooter} notification={notification} />;

  if (modalFooter.type === 'ModalFooter-AnnouncementCta')
    return <AnnouncementCtaFooter {...modalFooter} />;

  return null;
}
