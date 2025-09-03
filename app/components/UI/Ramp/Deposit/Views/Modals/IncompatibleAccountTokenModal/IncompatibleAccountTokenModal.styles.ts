import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for the IncompatibleAccountTokenModal component
 * @returns {Object} StyleSheet object containing component styles
 */
const styleSheet = () =>
  StyleSheet.create({
    headerTitle: {
      textAlign: 'center',
    },
    content: {
      paddingHorizontal: 16,
      gap: 16,
    },
  });

export default styleSheet;
