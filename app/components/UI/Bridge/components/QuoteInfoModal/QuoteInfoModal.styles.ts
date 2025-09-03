import { StyleSheet } from 'react-native';

/**
 * Creates styles for the QuoteInfoModal component
 * @returns {Object} StyleSheet object containing component styles
 */
const createStyles = () =>
  StyleSheet.create({
    container: {
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    footer: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      paddingBottom: 16,
    },
  });

export default createStyles;
