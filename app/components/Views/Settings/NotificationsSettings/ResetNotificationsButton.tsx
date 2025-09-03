import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { strings } from '../../../../../locales/i18n';
import Button, {
  ButtonSize,
  ButtonVariants,
} from '../../../../component-library/components/Buttons/Button';
import { useStyles } from '../../../../component-library/hooks';
import Routes from '../../../../constants/navigation/Routes';
import { useTheme } from '../../../../util/theme';
import styleSheet from './NotificationsSettings.styles';

/**
 * Test ID constant for the reset notifications button component
 * Used for automated testing and component identification
 */
export const RESET_NOTIFICATIONS_BUTTON_TEST_ID = 'reset_notifications_button';

/**
 * ResetNotificationsButton component renders a button that navigates to the reset notifications modal
 * Provides users with the ability to reset their notification settings and preferences
 * @returns {JSX.Element} Button component that triggers navigation to reset notifications flow
 */
export const ResetNotificationsButton = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { styles } = useStyles(styleSheet, { theme });

  const onPressResetNotifications = useCallback(() => {
    navigation.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
      screen: Routes.SHEET.RESET_NOTIFICATIONS,
    });
  }, [navigation]);

  return (
    <Button
      variant={ButtonVariants.Primary}
      label={strings('app_settings.reset_notifications')}
      size={ButtonSize.Md}
      onPress={onPressResetNotifications}
      style={styles.button}
      testID={RESET_NOTIFICATIONS_BUTTON_TEST_ID}
    />
  );
};
