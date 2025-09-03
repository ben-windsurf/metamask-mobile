import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for AddressCopy component
 * Defines styles for address display and copy button layout
 * @returns {Object} StyleSheet object with component styles
 */
const styleSheet = () =>
  StyleSheet.create({
    address: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    copyButton: {
      padding: 4,
    },
  });

export default styleSheet;
