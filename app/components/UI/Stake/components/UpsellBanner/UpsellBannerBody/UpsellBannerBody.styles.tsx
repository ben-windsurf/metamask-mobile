import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../../util/theme/models';

/**
 * Creates stylesheet for UpsellBannerBody component
 * @param {Object} params - Style parameters
 * @param {Theme} params.theme - Theme object containing colors and styling
 * @returns {Object} StyleSheet object with component styles
 */
const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;
  const { colors } = theme;

  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.alternative,
      borderRadius: 8,
      gap: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    left: {
      alignItems: 'flex-start',
    },
    tooltipContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    right: {
      justifyContent: 'center',
    },
  });
};

export default styleSheet;
