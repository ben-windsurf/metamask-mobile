import { StyleSheet, TextStyle } from 'react-native';
import type { Theme } from '../../../../../util/theme/models';

/**
 * Creates stylesheet for StakingEarnings component
 * @param {Object} params - Style parameters
 * @param {Theme} params.theme - Theme object containing colors and styling
 * @returns {Object} StyleSheet object with component-specific styles
 */
const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;
  const { colors } = theme;

  return StyleSheet.create({
    stakingEarningsContainer: {
      paddingTop: 16,
    },
    title: {
      paddingBottom: 8,
    } as TextStyle,
    keyValueRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    keyValuePrimaryTextWrapper: {
      flexDirection: 'row',
    },
    keyValuePrimaryTextWrapperCentered: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    keyValuePrimaryText: {
      color: colors.text.alternative,
    },
    keyValueSecondaryText: {
      alignItems: 'flex-end',
    },
  });
};

export default styleSheet;
