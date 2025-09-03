import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../../util/theme/models';

/**
 * Creates stylesheet for EnterEmail component with theme-based styling
 * @param {Object} params - Parameters object
 * @param {Theme} params.theme - Theme object containing color and style definitions
 * @returns {Object} StyleSheet object with component-specific styles
 */
const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;

  return StyleSheet.create({
    contentContainer: {
      marginTop: 24,
      gap: 16,
    },
    title: {
      fontWeight: 'bold',
    },
    description: {
      color: theme.colors.text.alternative,
    },
    error: {
      color: theme.colors.error.default,
    },
    footerContent: {
      gap: 8,
    },
  });
};

export default styleSheet;
