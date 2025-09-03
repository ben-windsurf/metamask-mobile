import React from 'react';
import { Switch, View } from 'react-native';
import { useTheme } from '../../../../../util/theme';
import { createStyles } from '../NotificationOptionToggle/styles';
import Text, {
  TextVariant,
} from '../../../../../component-library/components/Texts/Text';
import Icon, {
  IconColor,
  IconName,
  IconSize,
} from '../../../../../component-library/components/Icons/Icon';

/**
 * Test ID constant for notification switch components
 * Used for identifying notification toggle switches in tests
 */
export const NOTIFICATION_SWITCH = 'notifications-switch';

/**
 * Generates test ID for custom notifications row switch container
 * Creates a standardized test ID format for notification row containers
 * @param {string} testID - Base test ID for the switch (defaults to NOTIFICATION_SWITCH)
 * @returns {string} Formatted test ID string for the container element
 */
export const CUSTOM_NOTIFICATIONS_ROW_SWITCH_CONTAINER_TEST_ID = (
  testID = NOTIFICATION_SWITCH,
) => `${testID}--container`;

interface CustomNotificationsRowProps {
  title: string;
  description?: string;
  icon: IconName;
  isEnabled: boolean;
  toggleCustomNotificationsEnabled: () => void;
  testID?: string;
}

/**
 * CustomNotificationsRow component renders a notification setting row with toggle switch
 * Displays notification type with icon, title, optional description, and enable/disable toggle
 * Used in notification settings to allow users to control individual notification types
 * @param {CustomNotificationsRowProps} props - Component props
 * @returns {JSX.Element} Rendered notification row with toggle switch
 */
const CustomNotificationsRow = ({
  title,
  description,
  icon,
  isEnabled,
  toggleCustomNotificationsEnabled,
  testID = NOTIFICATION_SWITCH,
}: CustomNotificationsRowProps) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = createStyles();

  return (
    <View
      style={styles.container}
      testID={CUSTOM_NOTIFICATIONS_ROW_SWITCH_CONTAINER_TEST_ID(testID)}
    >
      <Icon
        name={icon}
        style={styles.icon}
        color={IconColor.Default}
        size={IconSize.Lg}
      />
      <View style={styles.titleContainer}>
        <Text variant={TextVariant.BodyLGMedium} style={styles.title}>
          {title}
        </Text>
        {description && (
          <Text variant={TextVariant.BodyLGMedium} style={styles.title}>
            {description}
          </Text>
        )}
      </View>
      <Switch
        value={isEnabled}
        onChange={toggleCustomNotificationsEnabled}
        trackColor={{
          true: colors.primary.default,
          false: colors.border.muted,
        }}
        thumbColor={theme.brandColors.white}
        style={styles.switch}
        ios_backgroundColor={colors.border.muted}
        testID={testID}
      />
    </View>
  );
};

export default React.memo(CustomNotificationsRow);
