import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../../util/theme/models';

/**
 * Creates stylesheet for EnterAddress component with theme-aware styling
 * @param {Object} params - Style parameters
 * @param {Theme} params.theme - Theme object containing color and styling definitions
 * @returns {Object} StyleSheet object with component-specific styles
 */
const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;

  return StyleSheet.create({
    textContainer: {
      marginTop: 24,
      marginBottom: 16,
      gap: 8,
    },
    subtitle: {
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
    countryPrefix: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    countryFlag: {
      fontSize: 16,
    },
    countryName: {
      fontSize: 14,
      color: theme.colors.text.muted,
      marginLeft: 4,
    },
    error: {
      color: theme.colors.error.default,
      fontSize: 12,
      marginTop: 4,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text.default,
      marginBottom: 6,
    },
  });
};

export default styleSheet;
