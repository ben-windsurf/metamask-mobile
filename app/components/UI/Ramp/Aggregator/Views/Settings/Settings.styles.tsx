import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for the Settings component
 * @returns {Object} StyleSheet object containing component styles
 */
const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    buttons: {
      flexDirection: 'row',
      columnGap: 8,
    },
    button: {
      flex: 1,
    },
  });

export default styles;
