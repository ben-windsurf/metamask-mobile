import { StyleSheet } from 'react-native';
import { fontStyles } from '../../../../../styles/common';
import { Theme } from '../../../../../util/theme/models';

/**
 * Creates styles for the SlippageModal component
 * @param {Theme} theme - Theme object containing colors and other styling properties
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      padding: 24,
      paddingBottom: 21,
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
    },
    description: {
      fontSize: 14,
      lineHeight: 20,
      color: colors.text.default,
      ...fontStyles.normal,
    },
    optionsContainer: {
      alignItems: 'center',
      marginBottom: 12,
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    segmentedControl: {
      gap: 8,
    },
  });

export default createStyles;
