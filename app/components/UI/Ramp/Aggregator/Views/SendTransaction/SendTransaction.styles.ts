import { Theme } from '../../../../../../util/theme/models';
import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for SendTransaction component
 * @param _params - Style parameters containing theme
 * @param _params.theme - Theme object for styling
 * @returns StyleSheet object with component styles
 */
const styleSheet = (_params: { theme: Theme }) =>
  StyleSheet.create({
    centered: {
      textAlign: 'center',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    normal: {
      fontWeight: 'normal',
    },
    paymentMethodDestination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      columnGap: 4,
    },
  });
export default styleSheet;
