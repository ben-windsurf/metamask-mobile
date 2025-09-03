/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for the ChangePassword component
 * Defines styling for password change form elements including settings section, description text, and confirmation button
 * @returns {Object} StyleSheet object containing styles for password change UI components
 */
export const createStyles = () =>
  StyleSheet.create({
    setting: {
      marginTop: 32,
    },
    desc: {
      marginTop: 8,
    },
    confirm: {
      marginTop: 16,
    },
  });
