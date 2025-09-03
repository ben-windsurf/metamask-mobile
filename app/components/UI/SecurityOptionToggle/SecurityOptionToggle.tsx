import React, { useCallback } from 'react';
import { Platform, Switch, View } from 'react-native';
import { createStyles } from './styles';
import generateTestId from '../../../../wdio/utils/generateTestId';
import Text, {
  TextColor,
  TextVariant,
} from '../../../component-library/components/Texts/Text';
import { useTheme } from '../../../util/theme';

interface SecurityOptionsToggleProps {
  title: string;
  description?: string;
  value: boolean;
  onOptionUpdated: (enabled: boolean) => void;
  testId?: string;
  disabled?: boolean;
}

/**
 * View that renders the toggle for security options
 * This component assumes that the parent will manage the state of the toggle. This is because most of the state is global.
 * @param {SecurityOptionsToggleProps} props - Component props
 * @param {string} props.title - The title text for the toggle option
 * @param {string} props.description - Optional description text displayed below the title
 * @param {boolean} props.value - Current toggle state (true for enabled, false for disabled)
 * @param {Function} props.onOptionUpdated - Callback function called when toggle value changes
 * @param {string} props.testId - Optional test ID for automated testing
 * @param {boolean} props.disabled - Whether the toggle should be disabled
 * @returns {JSX.Element} A toggle component with title, optional description, and switch control
 */
const SecurityOptionToggle = ({
  title,
  description,
  value,
  testId,
  onOptionUpdated,
  disabled,
}: SecurityOptionsToggleProps) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = createStyles();

  const handleOnValueChange = useCallback(
    (newValue: boolean) => {
      onOptionUpdated(newValue);
    },
    [onOptionUpdated],
  );
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text variant={TextVariant.BodyLGMedium} style={styles.title}>
          {title}
        </Text>
        <View style={styles.switchElement}>
          <Switch
            value={value}
            onValueChange={(newValue: boolean) => handleOnValueChange(newValue)}
            trackColor={{
              true: colors.primary.default,
              false: colors.border.muted,
            }}
            thumbColor={theme.brandColors.white}
            style={styles.switch}
            ios_backgroundColor={colors.border.muted}
            disabled={disabled}
            {...generateTestId(Platform, testId)}
          />
        </View>
      </View>
      {description ? (
        <Text
          variant={TextVariant.BodyMD}
          color={TextColor.Alternative}
          style={styles.desc}
        >
          {description}
        </Text>
      ) : null}
    </View>
  );
};

export default React.memo(SecurityOptionToggle);
