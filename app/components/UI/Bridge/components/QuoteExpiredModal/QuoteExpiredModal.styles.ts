import { StyleSheet } from 'react-native';

/**
 * Creates styles for the QuoteExpiredModal component
 * @returns {Object} StyleSheet object containing component styles
 */
const createStyles = () =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    footer: {
      paddingVertical: 20,
      paddingHorizontal: 16,
    },
  });

export default createStyles;
