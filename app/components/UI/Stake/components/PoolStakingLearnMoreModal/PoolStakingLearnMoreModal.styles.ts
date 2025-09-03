import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for the Pool Staking Learn More Modal component
 * @returns {Object} StyleSheet object containing styles for modal layout and text formatting
 */
const styleSheet = () =>
  StyleSheet.create({
    bodyTextContainer: {
      gap: 16,
      padding: 16,
    },
    italicText: {
      fontStyle: 'italic',
    },
    footer: {
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
  });

export default styleSheet;
