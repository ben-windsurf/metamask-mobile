import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for BalanceChangeList component
 * @returns {Object} StyleSheet object with component styles
 */
const styleSheet = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: 16,
    },
    totalFiatDisplayContainer: {
      flexDirection: 'row-reverse',
    },
  });

export default styleSheet;
