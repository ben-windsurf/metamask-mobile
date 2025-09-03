/* eslint-disable import/prefer-default-export */
import type { ThemeColors } from '@metamask/design-tokens';
import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for the RestoreWallet view component
 * Provides styling for wallet restoration screens with proper theming support
 * @param {ThemeColors} colors - Theme colors object from design tokens
 * @returns {Object} StyleSheet object containing styles for restore wallet UI elements
 */
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    images: {
      alignItems: 'center',
      padding: 16,
    },
    emoji: {
      padding: 16,
      fontSize: 64,
    },
    title: {
      textAlign: 'center',
      paddingBottom: 16,
    },
    description: {
      textAlign: 'center',
      padding: 8,
    },
    actionButtonWrapper: {
      width: '100%',
    },
    actionButton: {
      marginVertical: 10,
    },
    blueText: {
      color: colors.primary.default,
    },
  });
