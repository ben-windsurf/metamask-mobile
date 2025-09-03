import type { Theme } from '@metamask/design-tokens';
import { StyleSheet, TextStyle } from 'react-native';

/**
 * Creates stylesheet for ChartNavigationButton component
 * @param {Object} params - Style parameters
 * @param {Theme} params.theme - Design system theme object
 * @param {Object} params.vars - Style variables
 * @param {boolean} params.vars.selected - Whether the button is in selected state
 * @returns {Object} StyleSheet object with button and label styles
 */
const styleSheet = (params: {
  theme: Theme;
  vars: {
    selected: boolean;
  };
}) => {
  const {
    theme,
    vars: { selected },
  } = params;
  const { colors } = theme;
  return StyleSheet.create({
    button: {
      backgroundColor: selected
        ? colors.background.pressed
        : colors.background.default,
      borderRadius: 40,
      paddingVertical: 2,
      paddingHorizontal: 8,
      // compensates for letter spacing
      paddingLeft: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      letterSpacing: 3,
      textAlign: 'center',
    } as TextStyle,
  });
};

export default styleSheet;
