// Third party dependencies.
import { StyleSheet } from 'react-native';
import { Theme } from '../../../util/theme/models';
import { fontStyles } from '../../../styles/common';

/**
 * Style sheet function for AddressFrom component
 * Creates styles for displaying address information with proper theming
 * @param params Style sheet params
 * @param params.theme App theme from ThemeContext
 * @returns StyleSheet object with component-specific styles
 */
const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;
  const { colors } = theme;
  return StyleSheet.create({
    container: {},
    fromTextContainer: {
      marginHorizontal: 8,
      marginVertical: 8,
    },
    fromText: {
      ...fontStyles.normal,
      color: colors.text.default,
      fontSize: 16,
    },
    iconContainer: {
      marginRight: 8,
    },
    domainUrl: {
      ...fontStyles.bold,
      textAlign: 'center',
      fontSize: 14,
      color: colors.text.default,
    },
  });
};

export default styleSheet;
