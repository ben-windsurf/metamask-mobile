import { StyleSheet } from 'react-native';

import { Colors } from '../../../util/theme/models';

/**
 * Creates styles for the AccountFromToInfoCard component
 * @param {Colors} colors - Theme colors object
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
    },
    text: {
      lineHeight: 20,
      color: colors.text.default,
    },
  });

export default createStyles;
