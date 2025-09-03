import { StyleSheet } from 'react-native';

/**
 * Creates styles for the SettingsButtonSection component
 * @returns {Object} StyleSheet object containing component styles
 */
const createStyles = () =>
  StyleSheet.create({
    setting: {
      marginTop: 32,
    },
    desc: {
      marginTop: 8,
    },
    accessory: {
      marginTop: 16,
    },
    modalView: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 20,
    },
    modalTitle: {
      textAlign: 'center',
      marginBottom: 20,
    },
    modalText: {
      textAlign: 'center',
    },
  });

export default createStyles;
