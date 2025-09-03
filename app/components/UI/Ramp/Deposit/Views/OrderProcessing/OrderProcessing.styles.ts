import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for OrderProcessing component
 * Defines styles for content layout, error states, and button containers
 * @returns {Object} StyleSheet object with component styles
 */
const styleSheet = () =>
  StyleSheet.create({
    content: {
      flex: 1,
      paddingHorizontal: 16,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomContainer: {
      gap: 16,
    },
    buttonsContainer: {
      flexDirection: 'row',
      gap: 16,
    },
    button: {
      flex: 1,
    },
  });

export default styleSheet;
