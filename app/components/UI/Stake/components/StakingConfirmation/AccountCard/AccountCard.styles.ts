import type { Theme } from '../../../../../../util/theme/models';
import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for AccountCard component with theme-based styling
 * @param {Object} params - Parameters object
 * @param {Theme} params.theme - Theme object containing colors and styling properties
 * @returns {Object} StyleSheet object with component-specific styles
 */
const stylesSheet = (params: { theme: Theme }) => {
  const { theme } = params;
  const { colors } = theme;

  return StyleSheet.create({
    cardGroupTop: {
      borderWidth: 0,
      gap: 16,
      borderRadius: 8,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    cardGroupBottom: {
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderColor: colors.border.muted,
    },
    networkKeyValueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    tagMinimalPadding: {
      paddingLeft: 0,
      paddingRight: 8,
      paddingTop: 0,
      paddingBottom: 0,
    },
  });
};

export default stylesSheet;
