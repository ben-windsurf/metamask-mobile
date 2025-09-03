import type { Theme } from '@metamask/design-tokens';
import { StyleSheet, TextStyle } from 'react-native';

/**
 * Creates stylesheet for Price component with dynamic styling based on price difference
 * @param {Object} params - Styling parameters
 * @param {Theme} params.theme - Design system theme object
 * @param {Object} params.vars - Variable parameters for dynamic styling
 * @param {number} params.vars.priceDiff - Price difference value used to determine color styling
 * @returns {Object} StyleSheet object with component styles
 */
const styleSheet = (params: {
  theme: Theme;
  vars: {
    priceDiff: number;
  };
}) => {
  const {
    theme,
    vars: { priceDiff },
  } = params;
  const { colors } = theme;
  return StyleSheet.create({
    wrapper: {
      paddingHorizontal: 16,
    },
    priceDiff: {
      color:
        priceDiff > 0
          ? colors.success.default
          : priceDiff < 0
          ? colors.error.default
          : colors.text.alternative,
    } as TextStyle,
    priceDiffIcon: {
      marginTop: 10,
    },
    loadingPrice: {
      paddingTop: 8,
    },
    loadingPriceDiff: {
      paddingTop: 2,
    },
  });
};

export default styleSheet;
