import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for DeFi protocol position group tokens component
 * Defines styles for underlying token balances display and layout
 * @returns {Object} StyleSheet object containing component styles
 */
const styleSheet = () =>
  StyleSheet.create({
    underlyingBalancesWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
    },
    assetSymbolText: {
      marginLeft: 20,
    },
    balance: {
      flex: 1,
      alignItems: 'flex-end',
    },
  });

export default styleSheet;
