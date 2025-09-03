import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for legal links component
 * @returns {Object} StyleSheet object containing styles for legal links layout
 */
const stylesSheet = () =>
  StyleSheet.create({
    termsOfServiceButtonGroup: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    legalLink: {
      padding: 16,
    },
  });

export default stylesSheet;
