///: BEGIN:ONLY_INCLUDE_IF(preinstalled-snaps,external-snaps)
/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for Snaps components with hidden container styles.
 *
 * @returns StyleSheet object containing component styles
 */
export const createStyles = () =>
  StyleSheet.create({
    container: {
      height: 0,
      width: 0,
    },
  });
///: END:ONLY_INCLUDE_IF
