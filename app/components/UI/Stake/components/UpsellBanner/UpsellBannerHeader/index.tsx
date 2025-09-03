import React from 'react';
import { View } from 'react-native';
import { UpsellBannerHeaderProps } from '../UpsellBanner.types';
import styleSheet from './UpsellBannerHeader.styles';
import { useStyles } from '../../../../../hooks/useStyles';
import Text, {
  TextVariant,
  TextColor,
} from '../../../../../../component-library/components/Texts/Text';

/**
 * UpsellBannerHeader component renders the header section of an upsell banner
 * Displays primary, secondary, and tertiary text with optional end accessory element
 * @param {UpsellBannerHeaderProps} props - Component props
 * @param {string} props.primaryText - Main heading text
 * @param {string} props.secondaryText - Secondary text displayed in success color
 * @param {string} props.tertiaryText - Tertiary text displayed in alternative color
 * @param {React.ReactElement} props.endAccessory - Optional React element to display at the end
 * @returns {JSX.Element} The rendered upsell banner header component
 */
const UpsellBannerHeader = ({
  primaryText,
  secondaryText,
  tertiaryText,
  endAccessory,
}: UpsellBannerHeaderProps) => {
  const { styles } = useStyles(styleSheet, {});

  return (
    <View style={styles.container}>
      <Text variant={TextVariant.HeadingMD}>{primaryText}</Text>
      <Text variant={TextVariant.DisplayMD} color={TextColor.Success}>
        {secondaryText}
      </Text>
      <Text color={TextColor.Alternative}>{tertiaryText}</Text>
      {React.isValidElement(endAccessory) && endAccessory}
    </View>
  );
};

export default UpsellBannerHeader;
