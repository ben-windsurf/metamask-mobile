/* eslint-disable import/prefer-default-export */
import { fontStyles } from '../../../../../../styles/common';
import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for ProtectYourWallet security settings section
 * Provides styling for warning text, settings layout, and accessory elements
 * @param {any} colors - Theme colors object containing text and primary color definitions
 * @returns {Object} StyleSheet object with styles for the ProtectYourWallet component
 */
// TODO: Replace "any" with type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createStyles = (colors: any) =>
  StyleSheet.create({
    setting: {
      marginTop: 30,
    },
    firstSetting: {
      marginTop: 0,
    },
    desc: {
      marginTop: 8,
    },
    warningText: {
      color: colors.text.default,
      fontSize: 12,
      flex: 1,
      ...fontStyles.normal,
    },
    warningTextRed: {
      color: colors.text.default,
    },
    warningTextGreen: {
      color: colors.text.default,
    },
    viewHint: {
      marginLeft: 4,
    },
    warningBold: {
      ...fontStyles.bold,
      color: colors.primary.default,
    },
    accessory: {
      marginTop: 16,
    },
  });
