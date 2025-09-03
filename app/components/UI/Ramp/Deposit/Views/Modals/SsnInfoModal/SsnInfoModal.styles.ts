import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../../../util/theme/models';

/**
 * Creates stylesheet for SSN info modal component
 * @param {Object} params - Style parameters
 * @param {Theme} params.theme - Theme object containing color and style definitions
 * @returns {Object} StyleSheet object with component styles
 */
const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;

  return StyleSheet.create({
    headerTitle: {
      textAlign: 'center',
      color: theme.colors.text.default,
    },
    content: {
      padding: 16,
      gap: 16,
    },
  });
};

export default styleSheet;
