import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import generateTestId from '../../../../../wdio/utils/generateTestId';
import { useTheme } from '../../../../util/theme';
import Text from '../../../Base/Text';
import styleSheet from './AssetActionButton.styles';
import { useStyles } from '../../../../component-library/hooks';

interface AssetActionButtonProps {
  onPress?: () => void;
  icon?: string;
  label?: string;
  disabled?: boolean;
  testID?: string;
}

/**
 * AssetActionButton renders a customizable action button for asset operations
 * Displays an icon and label for actions like send, receive, swap, buy, etc.
 * @param {AssetActionButtonProps} props - Component props
 * @param {Function} props.onPress - Callback function when button is pressed
 * @param {string} props.icon - Icon type to display (send, receive, add, information, swap, buy)
 * @param {string} props.label - Text label to display below the icon
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {string} props.testID - Test identifier for automation
 * @returns {JSX.Element} The rendered asset action button component
 */
const AssetActionButton = ({
  onPress,
  icon,
  label,
  disabled,
  testID,
}: AssetActionButtonProps) => {
  const { colors } = useTheme();
  const { styles } = useStyles(styleSheet, {});

  const maxStringLength = 10;

  const getIcon = (type: string) => {
    switch (type) {
      case 'send': {
        return (
          <MaterialCommunityIcon
            name={'arrow-top-right'}
            size={20}
            style={styles.buttonIcon}
          />
        );
      }
      case 'receive': {
        return (
          <MaterialCommunityIcon
            name={'keyboard-tab'}
            size={20}
            color={colors.primary.inverse}
            style={[styles.buttonIcon, styles.receive]}
          />
        );
      }
      case 'add': {
        return <Ionicon name="add" size={30} style={styles.buttonIcon} />;
      }
      case 'information': {
        return (
          <Ionicon name="information" size={30} style={styles.buttonIcon} />
        );
      }
      case 'swap': {
        return (
          <MaterialCommunityIcon
            name="repeat"
            size={22}
            style={[styles.buttonIcon, styles.swapsIcon]}
          />
        );
      }
      case 'buy': {
        return (
          <FeatherIcon
            name="credit-card"
            size={20}
            style={[styles.buttonIcon, styles.buyIcon]}
          />
        );
      }
      default: {
        return null;
      }
    }
  };

  return (
    <TouchableOpacity
      {...generateTestId(Platform, testID)}
      onPress={onPress}
      style={[styles.button, disabled && styles.disabledButton]}
      disabled={disabled}
    >
      <View style={styles.buttonIconWrapper}>
        {icon && (typeof icon === 'string' ? getIcon(icon) : icon)}
      </View>
      {label && (
        <Text centered style={styles.buttonText} numberOfLines={1}>
          {label.length > maxStringLength
            ? `${label.substring(0, maxStringLength - 3)}...`
            : label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AssetActionButton;
