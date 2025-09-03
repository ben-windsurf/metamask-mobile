/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';
import { fontStyles } from '../../../../styles/common';
import Device from '../../../../util/device';

/**
 * Creates stylesheet for hardware wallet account details component
 * @param {any} colors - Theme colors object for styling
 * @returns {Object} StyleSheet object with component styles
 */
// TODO: Replace "any" with type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createStyle = (colors: any) =>
  StyleSheet.create({
    rowContainer: {
      flex: 1,
      height: 65,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: Device.isIphoneX() ? 20 : 10,
    },
    accountDetails: {
      justifyContent: 'flex-start',
    },
    linkIcon: {
      height: '100%',
      fontSize: 36,
      textAlignVertical: 'center',
    },
    index: {
      fontSize: 20,
      color: colors.text.default,
      ...fontStyles.normal,
    },
    information: {
      color: colors.text.alternative,
      ...fontStyles.normal,
    },
  });
