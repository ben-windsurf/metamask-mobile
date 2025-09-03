import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for RewardsCard component
 * Defines styles for the rewards card container and estimated annual reward value display
 * @returns {Object} StyleSheet object containing component styles
 */
const stylesSheet = () =>
  StyleSheet.create({
    card: {
      borderWidth: 0,
      gap: 16,
      borderRadius: 8,
    },
    estAnnualRewardValue: {
      flexDirection: 'row',
      gap: 8,
    },
  });

export default stylesSheet;
