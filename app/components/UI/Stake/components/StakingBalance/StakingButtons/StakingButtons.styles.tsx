import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for staking buttons component
 * Defines styles for button container layout and individual button styling
 * @returns {Object} StyleSheet object containing component styles
 */
const styleSheet = () =>
  StyleSheet.create({
    balanceButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 8,
    },
    balanceActionButton: {
      flex: 1,
    },
  });

export default styleSheet;
