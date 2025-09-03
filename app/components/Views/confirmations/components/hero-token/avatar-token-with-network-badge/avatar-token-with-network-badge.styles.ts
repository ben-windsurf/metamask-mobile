import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../../util/theme/models';

/**
 * Creates stylesheet for avatar token with network badge component
 * Provides styling for token avatar display with network badge overlay in confirmation views
 * @param {Object} params - Styling parameters
 * @param {Theme} params.theme - Theme object containing color and styling definitions
 * @returns {Object} StyleSheet object with avatarToken and base styles
 */
export const styleSheet = (params: { theme: Theme }) => {
  const { theme } = params;
  return StyleSheet.create({
    avatarToken: {
      backgroundColor: theme.colors.background.default,
      borderRadius: 99,
    },
    base: {
      justifyContent: 'center',
      flexDirection: 'row',
    },
  });
};
