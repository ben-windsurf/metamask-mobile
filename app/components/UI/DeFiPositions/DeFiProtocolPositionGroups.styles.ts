import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for DeFi protocol position groups component
 * Defines styles for protocol details wrapper and main container
 * @returns {Object} StyleSheet object containing component styles
 */
const styleSheet = () =>
  StyleSheet.create({
    protocolDetailsPositionsWrapper: {
      flexDirection: 'column',
      paddingHorizontal: 16,
      flex: 1,
    },
    wrapper: {
      flex: 1,
    },
  });

export default styleSheet;
