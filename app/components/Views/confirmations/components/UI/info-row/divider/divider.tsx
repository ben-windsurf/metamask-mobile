import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyles } from '../../../../../../../component-library/hooks';
import { Theme } from '../../../../../../../util/theme/models';

const styleSheet = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    base: {
      height: 1,
      backgroundColor: theme.colors.border.muted,
      // Ignore the padding from the section.
      marginHorizontal: -8,
    },
  });

/**
 * InfoRowDivider component renders a horizontal divider line for separating info rows
 * Used in confirmation screens to visually separate different sections of information
 * @returns {JSX.Element} A styled horizontal divider view
 */
export const InfoRowDivider: React.FC = () => {
  const { styles } = useStyles(styleSheet, {});

  return <View style={styles.base} />;
};
