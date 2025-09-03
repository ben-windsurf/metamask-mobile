import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../../util/theme/models';

/**
 * Creates styles for the OrdersList component
 * @param {Colors} colors - Theme colors object
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = (colors: Colors) =>
  StyleSheet.create({
    filters: {
      flexDirection: 'row',
      columnGap: 8,
      alignItems: 'center',
      marginVertical: 16,
      marginHorizontal: 24,
    },
    emptyMessage: {
      textAlign: 'center',
    },
    row: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border.muted,
    },
  });

export default createStyles;
