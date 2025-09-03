import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../../util/theme/models';

/**
 * Creates stylesheet for UpsellBannerHeader component
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
      paddingVertical: 24,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
  });
};

export default styleSheet;
