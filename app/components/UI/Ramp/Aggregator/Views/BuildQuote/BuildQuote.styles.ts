import { Theme } from '../../../../../../util/theme/models';
import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for BuildQuote component with theme-aware styling
 * @param {Object} params - Parameters object
 * @param {Theme} params.theme - Theme object containing colors and styling properties
 * @returns {Object} StyleSheet object with component-specific styles
 */
const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;
  const { colors } = theme;

  return StyleSheet.create({
    viewContainer: {
      flex: 1,
    },
    selectors: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    spacer: {
      minWidth: 8,
    },
    keypadContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingBottom: 50,
      backgroundColor: colors.background.alternative,
    },
    cta: {
      paddingTop: 12,
    },
    flexRow: {
      flexDirection: 'row',
    },
    flagText: {
      marginVertical: 3,
      marginHorizontal: 0,
    },
  });
};

export default styleSheet;
