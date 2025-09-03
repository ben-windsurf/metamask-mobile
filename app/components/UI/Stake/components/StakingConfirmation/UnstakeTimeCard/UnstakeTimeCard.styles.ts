import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for UnstakeTimeCard component
 * @returns {Object} StyleSheet object containing card styling with border and layout properties
 */
const styleSheet = () =>
  StyleSheet.create({
    card: {
      borderWidth: 0,
      borderRadius: 8,
      gap: 16,
    },
  });

export default styleSheet;
