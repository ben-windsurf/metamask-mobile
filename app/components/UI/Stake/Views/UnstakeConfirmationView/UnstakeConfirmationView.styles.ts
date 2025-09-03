import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../util/theme/models';

/**
 * Creates stylesheet for the UnstakeConfirmationView component
 * @param {Object} params - Style parameters
 * @param {Theme} params.theme - The theme object containing colors and styling
 * @returns {Object} StyleSheet object with component styles
 */
const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;
  const { colors } = theme;

  return StyleSheet.create({
    mainContainer: {
      paddingTop: 8,
      paddingHorizontal: 16,
      backgroundColor: colors.background.alternative,
      height: '100%',
      justifyContent: 'space-between',
    },
    cardsContainer: {
      paddingTop: 8,
      gap: 8,
    },
  });
};

export default styleSheet;
