import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for StakingCta component
 * Defines styles for title, content layout, and padding
 * @returns {Object} StyleSheet object with component styles
 */
const styleSheet = () =>
  StyleSheet.create({
    title: {
      paddingBottom: 16,
      paddingTop: 14,
    },
    contentMain: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    rightPad: {
      paddingRight: 3,
    },
  });

export default styleSheet;
