// Third party dependencies.
import { StyleSheet } from 'react-native';

/**
 * Style sheet function for CaipAccountSelectorList component
 * Creates styles for account selector list balances and labels
 * @returns StyleSheet object containing component styles
 */
const styleSheet = () =>
  StyleSheet.create({
    balancesContainer: {
      alignItems: 'flex-end',
      flexDirection: 'column',
    },
    balanceLabel: { textAlign: 'right' },
  });

export default styleSheet;
