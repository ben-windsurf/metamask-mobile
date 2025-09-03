import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for InteractiveTimespanChart component
 * @returns {Object} StyleSheet object containing chart container and chart styles
 */
const styleSheet = () =>
  StyleSheet.create({
    chartContainer: {
      paddingVertical: 16,
    },
    chart: {
      height: 112,
    },
  });

export default styleSheet;
