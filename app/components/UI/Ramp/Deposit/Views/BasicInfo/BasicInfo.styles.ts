import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../../util/theme/models';

/**
 * Creates stylesheet for BasicInfo component with theme-aware styling
 * @param {Object} params - Style parameters
 * @param {Theme} params.theme - Theme object containing color and styling definitions
 * @returns {Object} StyleSheet object with component-specific styles
 */
const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;

  return StyleSheet.create({
    title: {
      marginTop: 24,
    },
    subtitle: {
      marginBottom: 16,
      color: theme.colors.text.muted,
    },
    nameInputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16,
    },
    nameInputContainer: {
      flex: 1,
    },
    calendarIcon: {
      color: theme.colors.icon.default,
    },
    footerContent: {
      gap: 8,
    },
    ssnLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
  });
};

export default styleSheet;
