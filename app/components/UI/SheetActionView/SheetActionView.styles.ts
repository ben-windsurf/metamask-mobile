import { StyleSheet } from 'react-native';

/**
 * Creates styles for the SheetActionView component
 * @returns {Object} StyleSheet object containing component styles
 */
const createStyles = () =>
  StyleSheet.create({
    actionsContainer: {
      flexDirection: 'row',
      padding: 16,
    },
    cancelButton: { flex: 1, marginRight: 8 },
    confirmButton: { flex: 1, marginLeft: 8 },
  });

export default createStyles;
