import type { Theme } from '../../../../../util/theme/models';
import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for StakeConfirmationView component
 * @param {Object} params - Style parameters
 * @param {Theme} params.theme - The theme object containing colors and styling
 * @returns {Object} StyleSheet object with component styles
 */
const stylesSheet = (params: { theme: Theme }) => {
  const { theme } = params;
  const { colors } = theme;

  return StyleSheet.create({
    mainContainer: {
      flexGrow: 1,
      paddingTop: 8,
      paddingHorizontal: 16,
      backgroundColor: colors.background.alternative,
      justifyContent: 'space-between',
    },
    cardsContainer: {
      paddingTop: 16,
      gap: 8,
    },
  });
};

export default stylesSheet;
