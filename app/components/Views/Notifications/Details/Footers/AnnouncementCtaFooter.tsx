import React from 'react';
import { Linking } from 'react-native';
import Button, {
  ButtonVariants,
} from '../../../../../component-library/components/Buttons/Button';
import { ModalFooterAnnouncementCta } from '../../../../../util/notifications/notification-states/types/NotificationModalDetails';
import useStyles from '../useStyles';

type AnnouncementCtaFooterProps = ModalFooterAnnouncementCta;

/**
 * AnnouncementCtaFooter component renders a call-to-action button for announcement notifications
 * Opens external links when the CTA button is pressed, typically used for feature announcements
 * @param {AnnouncementCtaFooterProps} props - The announcement CTA footer properties containing mobile link data
 * @returns {JSX.Element | null} A secondary button component or null if no mobile link is provided
 */
export default function AnnouncementCtaFooter(
  props: AnnouncementCtaFooterProps,
) {
  const { styles } = useStyles();

  if (!props.mobileLink) {
    return null;
  }

  const { extensionLinkRoute, extensionLinkText } = props.mobileLink;

  // TODO - Feature Announcement Links are internal, needs rework
  return (
    <Button
      variant={ButtonVariants.Secondary}
      label={extensionLinkText}
      style={styles.ctaBtn}
      onPress={() => Linking.openURL(extensionLinkRoute)}
    />
  );
}
