/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for the Clear Privacy settings section
 * Defines styles for privacy clearing modal, settings layout, and UI components
 * @returns {Object} StyleSheet object containing styles for privacy settings UI
 */
export const styleSheet = () =>
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
    modalText: {
      textAlign: 'center',
    },
    modalTitle: {
      textAlign: 'center',
      marginBottom: 20,
    },
  });
