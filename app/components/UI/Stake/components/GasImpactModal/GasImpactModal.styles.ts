import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for the GasImpactModal component
 * @returns {Object} StyleSheet object containing styles for modal container, content, and footer
 */
const styleSheet = () =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    content: {
      paddingBottom: 16,
    },
    footer: {
      paddingBottom: 16,
    },
  });

export default styleSheet;
