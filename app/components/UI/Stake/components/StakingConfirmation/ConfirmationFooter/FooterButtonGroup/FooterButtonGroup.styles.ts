import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for FooterButtonGroup component
 * Defines styles for button layout and spacing in the confirmation footer
 * @returns {Object} StyleSheet object containing component styles
 */
const stylesSheet = () =>
  StyleSheet.create({
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 16,
      paddingTop: 24,
    },
    button: {
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: 0,
    },
  });

export default stylesSheet;
