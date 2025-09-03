import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../../../util/theme/models';

interface StateSelectorModalStyleSheetVars {
  screenHeight: number;
}
/**
 * Creates stylesheet for StateSelectorModal component
 * @param {Object} params - Styling parameters
 * @param {Theme} params.theme - Theme object containing colors and styling
 * @param {StateSelectorModalStyleSheetVars} params.vars - Variables for dynamic styling
 * @returns {Object} StyleSheet object with component styles
 */
const styleSheet = (params: {
  theme: Theme;
  vars: StateSelectorModalStyleSheetVars;
}) => {
  const { vars } = params;
  const { screenHeight } = vars;

  return StyleSheet.create({
    list: {
      maxHeight: screenHeight * 0.4,
    },
    searchContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    sectionHeader: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    state: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    stateCode: {
      marginRight: 12,
      minWidth: 40,
    },
    emptyList: {
      padding: 16,
      alignItems: 'center',
    },
    listItem: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
  });
};

export default styleSheet;
