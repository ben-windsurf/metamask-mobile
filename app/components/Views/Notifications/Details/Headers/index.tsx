import React from 'react';
import type { ModalHeader } from '../../../../../util/notifications/notification-states/types/NotificationModalDetails';
import AnnouncementImageHeader from './AnnouncementImageHeader';
import NFTImageHeader from './NFTImageHeader';

interface Props {
  modalHeader: ModalHeader;
}

/**
 * ModalHeader component renders different types of modal headers based on the header type
 * Supports announcement image headers and NFT image headers for notification modals
 * @param {Props} props - Component props
 * @param {ModalHeader} props.modalHeader - The modal header configuration object
 * @returns {JSX.Element | null} The appropriate header component or null if no matching type
 */
export default function ModalHeader({ modalHeader }: Props) {
  if (modalHeader.type === 'ModalHeader-AnnouncementImage')
    return <AnnouncementImageHeader {...modalHeader} />;

  if (modalHeader.type === 'ModalHeader-NFTImage')
    return <NFTImageHeader {...modalHeader} />;

  return null;
}
