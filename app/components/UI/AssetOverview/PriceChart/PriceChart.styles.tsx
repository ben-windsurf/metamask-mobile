import type { Theme } from '@metamask/design-tokens';
import { Dimensions, StyleSheet, TextStyle } from 'react-native';
import {
  getFontFamily,
  TextVariant,
} from '../../../../component-library/components/Texts/Text';

/**
 * Standard height for price charts, calculated as 44% of screen height
 */
export const CHART_HEIGHT = Dimensions.get('screen').height * 0.44;

/**
 * Creates stylesheet for PriceChart component with theme-aware styling
 * @param {Object} params - Style parameters
 * @param {Theme} params.theme - The theme object containing colors and typography
 * @returns {Object} StyleSheet object with chart styling definitions
 */
const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;
  const { typography } = theme;
  return StyleSheet.create({
    chart: {
      paddingRight: 0,
      paddingLeft: 0,
      height: CHART_HEIGHT - 10, // hack to remove internal padding that is not configurable
      paddingTop: 0,
      marginVertical: 10,
      width: Dimensions.get('screen').width,
    },
    chartArea: {
      flex: 1,
    },
    chartLoading: {
      width: Dimensions.get('screen').width,
      paddingHorizontal: 16,
      paddingTop: 10,
    },
    noDataOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 96,
      zIndex: 1,
    },
    noDataOverlayTitle: {
      ...typography.sHeadingMD,
      fontFamily: getFontFamily(TextVariant.HeadingMD),
      textAlign: 'center',
    } as TextStyle,
    noDataOverlayText: {
      textAlign: 'center',
    } as TextStyle,
    tooltipLine: {
      color: theme.colors.icon.alternative,
    },
    tooltipCircle: {
      color: theme.colors.primary.inverse,
    },
  });
};

export default styleSheet;
