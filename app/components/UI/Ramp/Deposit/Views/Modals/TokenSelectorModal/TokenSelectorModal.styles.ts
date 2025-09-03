import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../../../util/theme/models';

interface TokenSelectorModalStyleSheetVars {
  screenHeight: number;
}
/**
 * Creates stylesheet for TokenSelectorModal component
 * @param {Object} params - Style parameters
 * @param {Theme} params.theme - Theme object for styling
 * @param {TokenSelectorModalStyleSheetVars} params.vars - Variables for dynamic styling
 * @returns {Object} StyleSheet object with component styles
 */
const styleSheet = (params: {
  theme: Theme;
  vars: TokenSelectorModalStyleSheetVars;
}) => {
  const { vars } = params;
  const { screenHeight } = vars;

  return StyleSheet.create({
    list: {
      height: screenHeight * 0.4,
    },
    searchContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
  });
};

export default styleSheet;
