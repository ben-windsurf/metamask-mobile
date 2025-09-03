import { useMemo } from 'react';
import { createStyles } from './styles';
import { useTheme } from '../../../../util/theme';

/**
 * Custom hook that provides theme and styles for notification details components
 * Memoizes style creation to optimize performance when theme changes
 * @returns {Object} Object containing theme and memoized styles
 */
export default function useStyles() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return { theme, styles };
}
