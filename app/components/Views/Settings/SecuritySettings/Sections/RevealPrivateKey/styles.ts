/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for the RevealPrivateKey component
 * Defines styling for the private key reveal interface including settings section, description text, and confirmation button
 * @returns {Object} StyleSheet object containing styles for private key reveal UI elements
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
