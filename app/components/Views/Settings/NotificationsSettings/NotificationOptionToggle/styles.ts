/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';

/**
 * Creates stylesheet for NotificationOptionToggle component
 * Defines layout styles for notification toggle rows with icons, titles, and switches
 * @returns {Object} StyleSheet object containing styles for notification toggle components
 */
export const createStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    titleContainer: {
      alignItems: 'flex-start',
      flex: 1,
    },
    title: {
      flex: 1,
    },
    switchElement: {
      marginLeft: 16,
    },
    switch: {
      alignSelf: 'flex-start',
    },
    icon: {
      marginRight: 16,
    },
    accountAvatar: {
      marginRight: 16,
    },
  });
