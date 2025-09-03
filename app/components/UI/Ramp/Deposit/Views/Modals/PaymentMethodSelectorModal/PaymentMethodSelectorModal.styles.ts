import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../../../util/theme/models';

interface PaymentSelectorModalStyleSheetVars {
  screenHeight: number;
}
/**
 * Creates stylesheet for PaymentMethodSelectorModal component
 * @param {Object} params - Styling parameters
 * @param {Theme} params.theme - Theme object containing color and styling definitions
 * @param {PaymentSelectorModalStyleSheetVars} params.vars - Variables for dynamic styling including screen dimensions
 * @returns {Object} StyleSheet object with component-specific styles
 */
const styleSheet = (params: {
  theme: Theme;
  vars: PaymentSelectorModalStyleSheetVars;
}) => {
  const { vars, theme } = params;
  const { screenHeight } = vars;

  return StyleSheet.create({
    list: {
      maxHeight: screenHeight * 0.4,
    },
    iconContainer: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary.muted,
      borderRadius: 8,
    },
  });
};

export default styleSheet;
