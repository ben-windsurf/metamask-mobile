import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for TokenValueStack component
 * Defines styles for token value display container, badges, logos, and balance layouts
 * @returns {Object} StyleSheet object containing component styles
 */
const stylesSheet = () =>
  StyleSheet.create({
    tokenValueStackContainer: {
      alignItems: 'center',
      paddingVertical: 8,
      gap: 8,
    },
    badgeWrapper: {
      alignSelf: 'center',
    },
    ethLogo: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    balancesContainer: {
      alignItems: 'center',
    },
  });

export default stylesSheet;
