import { StyleSheet } from 'react-native';
/**
 * Creates stylesheet for DeFi protocol position details component
 * Defines styles for layout wrapper, separator, and positioning elements
 * @returns {Object} StyleSheet object containing component styles
 */
const styleSheet = () =>
  StyleSheet.create({
    detailsWrapper: {
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separatorWrapper: {
      paddingHorizontal: 16,
    },
    protocolPositionDetailsWrapper: {
      flex: 1,
    },
  });

export default styleSheet;
