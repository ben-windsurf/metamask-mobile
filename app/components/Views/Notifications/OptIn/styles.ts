/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';
import type { Theme } from '@metamask/design-tokens';
import Device from '../../../../util/device';
import scaling from '../../../../util/scaling';

const HEIGHT = scaling.scale(240);

/**
 * Creates stylesheet for the notifications opt-in view component
 * Provides styling for the opt-in card, buttons, and layout elements
 * @param {Theme} theme - The theme object containing color tokens
 * @param {Object} theme.colors - Color palette from the design system
 * @returns {Object} StyleSheet object containing component styles
 */
export const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      alignItems: 'flex-start',
      backgroundColor: colors.background.default,
      paddingTop: 60,
      paddingHorizontal: 16,
    },
    card: {
      height: HEIGHT,
      width: Device.getDeviceWidth() - 32,
      alignSelf: 'center',
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 16,
    },
    image: {
      resizeMode: 'cover',
      height: HEIGHT,
      width: Device.getDeviceWidth() - 32,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
      marginBottom: 16,
    },
    ctaBtn: {
      margin: 4,
      width: '48%',
      alignSelf: 'center',
    },
    textSpace: {
      marginBottom: 16,
    },
    textTitle: {
      marginBottom: 16,
      alignSelf: 'center',
    },
  });
