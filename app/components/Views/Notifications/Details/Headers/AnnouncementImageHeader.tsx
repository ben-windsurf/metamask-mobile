import React from 'react';
import { View } from 'react-native';
import { ModalHeaderAnnouncementImage } from '../../../../../util/notifications/notification-states/types/NotificationModalDetails';
import RemoteImage from '../../../../Base/RemoteImage';
import useStyles from '../useStyles';

type AnnouncementImageHeaderProps = ModalHeaderAnnouncementImage;

/**
 * AnnouncementImageHeader component displays an image header for announcement notifications
 * Renders a remote image with proper styling and placeholder handling for notification modals
 * @param {AnnouncementImageHeaderProps} props - Component props containing image URL
 * @returns {JSX.Element} The rendered announcement image header component
 */
export default function AnnouncementImageHeader(
  props: AnnouncementImageHeaderProps,
) {
  const { styles } = useStyles();
  return (
    <View style={styles.headerImageContainer}>
      <RemoteImage
        source={{ uri: props.imageUrl }}
        style={styles.headerImageFull}
        placeholderStyle={styles.headerImageFullPlaceholder}
      />
    </View>
  );
}
