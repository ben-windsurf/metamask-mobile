import React, { memo } from 'react';
import {
  ImageStyle,
  StyleSheet,
  StyleProp,
  ImageSourcePropType,
} from 'react-native';
import isUrl from 'is-url';
import RemoteImage from '../../Base/RemoteImage';
import { useTheme } from '../../../util/theme';

interface Props {
  /**
   * URL of the logo
   */
  logo: string;
  /**
   * Custom style to apply to image
   */
  customStyle?: StyleProp<ImageStyle>;
  /**
   * Token address
   */
  address?: string;
}

/**
 * Creates styles for the AssetIcon component
 * @param {any} colors - Theme colors object
 * @returns {Object} StyleSheet object with component styles
 */
// TODO: Replace "any" with type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStyles = (colors: any) =>
  StyleSheet.create({
    logo: {
      width: 50,
      height: 50,
      borderRadius: 25,
      overflow: 'hidden',
    },
    placeholder: { backgroundColor: colors.background.alternative },
  });

/**
 * AssetIcon component displays an asset icon with fallback handling
 * Renders a remote image for token/asset logos with proper styling and placeholder support
 * @param {Props} props - Component props
 * @param {string} props.logo - URL of the logo to display
 * @param {StyleProp<ImageStyle>} props.customStyle - Custom style to apply to image
 * @param {string} props.address - Token address for caching purposes
 * @returns {JSX.Element|null} The rendered asset icon or null if no logo provided
 */
// eslint-disable-next-line react/display-name
const AssetIcon = memo((props: Props) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  if (!props.logo) return null;

  const style = [styles.logo, props.customStyle];
  const isImageUrl = isUrl(props.logo) || props.logo.substr(0, 4) === 'ipfs';
  const source: ImageSourcePropType | null = isImageUrl
    ? { uri: props.logo }
    : null;

  if (!source) {
    return null;
  }

  return (
    <RemoteImage
      key={props.logo}
      address={props.address}
      fadeIn
      placeholderStyle={styles.placeholder}
      source={source}
      style={style}
    />
  );
});

export default AssetIcon;
