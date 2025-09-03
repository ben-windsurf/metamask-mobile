import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for DeFi positions list item component
 * Defines styles for list item layout, content wrapper, and balance display
 * @returns StyleSheet object containing styles for DeFi positions list item
 */
const styleSheet = () =>
  StyleSheet.create({
    listItemWrapper: {
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'flex-start',
    },
    contentWrapper: {
      marginLeft: 20,
    },
    balance: {
      flex: 1,
      alignItems: 'flex-end',
    },
  });

export default styleSheet;
