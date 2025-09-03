import type { Theme } from '@metamask/design-tokens';
import { StyleSheet, TextStyle } from 'react-native';
import {
  getFontFamily,
  TextVariant,
} from '../../../../component-library/components/Texts/Text';

/**
 * Creates stylesheet for AboutAsset component with theme-aware styling
 * @param {Object} params - Style parameters
 * @param {Theme} params.theme - The theme object containing design tokens
 * @returns {Object} StyleSheet object with component styles
 */
const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;
  const { typography } = theme;
  return StyleSheet.create({
    wrapper: {
      marginTop: 20,
    },
    text: {
      ...typography.sBodyMD,
      fontFamily: getFontFamily(TextVariant.BodyMD),
      marginVertical: 0,
    } as TextStyle,
    title: {
      ...typography.sHeadingSM,
      fontFamily: getFontFamily(TextVariant.HeadingSM),
      marginVertical: 0,
      marginBottom: 4,
    } as TextStyle,
  });
};

export default styleSheet;
