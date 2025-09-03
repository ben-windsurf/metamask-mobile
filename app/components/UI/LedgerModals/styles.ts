/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';
import { Colors } from '../../../util/theme/models';

/**
 * Creates stylesheet for Ledger modal components
 * @param {Colors} colors - Theme colors object
 * @returns {Object} StyleSheet object with modal and content wrapper styles
 */
export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      height: 600,
      margin: 0,
      zIndex: 1000,
    },
    contentWrapper: {
      zIndex: 1000,
      paddingHorizontal: 8,
      marginHorizontal: 8,
      paddingBottom: 32,
      borderRadius: 20,
      backgroundColor: colors.background.default,
    },
  });
