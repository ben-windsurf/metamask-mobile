import { StyleSheet } from 'react-native';
import { Theme } from '../../../../util/theme/models';
import sharedStyles from '../shared.styles';

/**
 * Creates stylesheet for AssetPill component with theme-based styling
 * @param {Object} params - Style parameters
 * @param {Theme} params.theme - Theme object containing color and style definitions
 * @returns {Object} StyleSheet object with component styles
 */
const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;

  return StyleSheet.create({
    nativeAssetPill: {
      ...sharedStyles.pill,
      backgroundColor: theme.colors.background.alternative,
    },
    assetPill: {
      flexShrink: 1,
      flexBasis: 'auto',
      minWidth: 0,
    },
  });
};

export default styleSheet;
