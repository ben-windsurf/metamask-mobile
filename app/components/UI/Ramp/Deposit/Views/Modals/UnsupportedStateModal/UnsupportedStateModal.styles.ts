import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for the UnsupportedStateModal component
 * Defines styles for modal content, icons, state container, and footer layout
 * @returns {Object} StyleSheet object with component styles
 */
const styleSheet = () =>
  StyleSheet.create({
    content: {
      padding: 24,
    },
    iconContainer: {
      marginBottom: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 8,
    },
    footer: {
      padding: 24,
      paddingTop: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
    },
  });

export default styleSheet;
