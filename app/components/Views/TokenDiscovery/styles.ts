import { Theme } from '@metamask/design-tokens';
import { StyleSheet } from 'react-native';
import { baseStyles } from '../../../styles/common';

/**
 * Creates stylesheet for TokenDiscovery view with theme-aware styling
 * Provides container styles with background color and centered layout for token discovery interface
 * @param {Object} params - Theme parameters object
 * @param {Theme} params.theme - MetaMask design system theme containing colors and other design tokens
 * @returns {Object} StyleSheet object containing styled components for TokenDiscovery view
 */
export const styleSheet = ({ theme: { colors } }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      ...baseStyles.flexGrow,
      backgroundColor: colors.background.default,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default styleSheet;
