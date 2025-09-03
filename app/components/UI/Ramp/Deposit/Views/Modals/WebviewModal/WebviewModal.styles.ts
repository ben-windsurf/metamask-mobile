import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../../../util/theme/models';

/**
 * Creates stylesheet for WebviewModal component
 * @param {Object} params - Style parameters
 * @param {Theme} params.theme - Theme object containing color and style definitions
 * @param {Object} params.vars - Variable parameters for dynamic styling
 * @param {number} params.vars.screenHeight - Screen height for responsive styling
 * @returns {Object} StyleSheet object with component styles
 */
const styleSheet = (params: { theme: Theme; vars: { screenHeight: number } }) =>
  StyleSheet.create({
    headerWithoutPadding: {
      paddingVertical: 0,
    },
    webview: {
      backgroundColor: params.theme.colors.background.default,
    },
  });

export default styleSheet;
