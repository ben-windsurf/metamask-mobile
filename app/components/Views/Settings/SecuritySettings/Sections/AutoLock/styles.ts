import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../../util/theme/models';

/**
 * Creates stylesheet for AutoLock settings section with theme-aware styling
 * Provides consistent styling for auto-lock configuration UI elements
 * @param {Object} params - Parameters object containing theme configuration
 * @param {Theme} params.theme - Theme object with colors and styling properties
 * @returns {Object} StyleSheet object containing styles for auto-lock settings
 */
export const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;
  const { colors } = theme;

  return StyleSheet.create({
    setting: {
      marginTop: 32,
    },
    desc: {
      marginTop: 8,
    },
    picker: {
      borderColor: colors.border.default,
      borderRadius: 5,
      borderWidth: 2,
      marginTop: 16,
    },
  });
};

export default styleSheet;
