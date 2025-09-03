import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for DeFi positions list component
 * @returns StyleSheet object containing styles for empty view and wrapper
 */
const styleSheet = () =>
  StyleSheet.create({
    emptyView: {
      alignItems: 'center',
      marginTop: 180,
    },
    wrapper: {
      flex: 1,
    },
  });

export default styleSheet;
