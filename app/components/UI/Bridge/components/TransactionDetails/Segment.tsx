import React from 'react';
import { StatusTypes } from '@metamask/bridge-controller';
import { Box } from '../../../Box/Box';
import { useTheme } from '../../../../../util/theme';
import { StyleSheet } from 'react-native';

/**
 * Creates styles for the segment component based on status type
 * @param {StatusTypes | null} type - The status type that determines segment appearance
 * @returns {Object} StyleSheet object with outerSegment and innerSegment styles
 */
const getSegmentStyle = (type: StatusTypes | null) =>
  StyleSheet.create({
    outerSegment: {
      height: 4,
      width: '35%',
    },
    innerSegment: {
      height: 4,
      width: 0,
      borderRadius: 9999,
      // @ts-expect-error - bridge team needs to fix this with animated api since transition does not exist in react native
      transition: 'width 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      ...(type === StatusTypes.PENDING && { width: '50%' }),
      ...(type === StatusTypes.COMPLETE && { width: '100%' }),
    },
  });

/**
 * Segment component displays a progress indicator for bridge transaction status
 * Renders a visual progress bar that fills based on the transaction status
 * @param {Object} props - Component props
 * @param {StatusTypes | null} props.type - The status type that determines segment fill level
 * @returns {JSX.Element} A progress segment with dynamic width based on status
 */
export default function Segment({ type }: { type: StatusTypes | null }) {
  const theme = useTheme();
  const styles = getSegmentStyle(type);
  return (
    <Box
      backgroundColor={theme.colors.background.alternative}
      style={styles.outerSegment}
    >
      <Box
        backgroundColor={theme.colors.primary.default}
        style={styles.innerSegment}
      />
    </Box>
  );
}
