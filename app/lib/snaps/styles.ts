///: BEGIN:ONLY_INCLUDE_IF(preinstalled-snaps,external-snaps)
/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for Snaps components with minimal container styles
 * Used for Snaps UI rendering where components need zero-sized containers
 * @returns {Object} StyleSheet object containing container styles for Snaps
 */
export const createStyles = () =>
  StyleSheet.create({
    container: {
      height: 0,
      width: 0,
    },
  });
///: END:ONLY_INCLUDE_IF
