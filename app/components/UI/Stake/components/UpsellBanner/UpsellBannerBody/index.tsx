import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styleSheet from './UpsellBannerBody.styles';
import { UpsellBannerBodyProps } from '../UpsellBanner.types';
import { useStyles } from '../../../../../hooks/useStyles';
import Text, {
  TextVariant,
  TextColor,
} from '../../../../../../component-library/components/Texts/Text';
import Icon, {
  IconName,
  IconColor,
  IconSize,
} from '../../../../../../component-library/components/Icons/Icon';

/**
 * UpsellBannerBody component renders the main content area of an upsell banner
 * Displays primary, secondary, and tertiary text with an optional tooltip and end accessory
 * @param {UpsellBannerBodyProps} props - Component props
 * @param {string} props.primaryText - Main heading text
 * @param {string} props.secondaryText - Secondary text displayed in success color
 * @param {string} props.tertiaryText - Additional descriptive text
 * @param {Function} props.onTooltipPress - Callback function when tooltip icon is pressed
 * @param {React.ReactElement} props.endAccessory - Optional React element to display on the right side
 * @returns {JSX.Element} The rendered upsell banner body component
 */
const UpsellBannerBody = ({
  primaryText,
  secondaryText,
  tertiaryText,
  onTooltipPress,
  endAccessory,
}: UpsellBannerBodyProps) => {
  const { styles } = useStyles(styleSheet, {});

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text variant={TextVariant.HeadingMD}>{primaryText}</Text>
        <Text variant={TextVariant.DisplayMD} color={TextColor.Success}>
          {secondaryText}
        </Text>
        <View style={styles.tooltipContainer}>
          <Text variant={TextVariant.BodyMD} color={TextColor.Alternative}>
            {tertiaryText}
          </Text>
          <TouchableOpacity onPress={onTooltipPress}>
            <Icon
              name={IconName.Info}
              size={IconSize.Sm}
              color={IconColor.Alternative}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.right}>
        {React.isValidElement(endAccessory) && endAccessory}
      </View>
    </View>
  );
};

export default UpsellBannerBody;
