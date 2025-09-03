import React from 'react';
import { G, Circle, Line } from 'react-native-svg';
import { useTheme } from '../../../../../../../util/theme';

export interface GraphCursorProps {
  data: number[];
  currentX: number;
  color?: string;
  // Props below are passed in implicitly by <AreaChart/> from react-native-svg-charts
  // src: https://github.com/JesperLekland/react-native-svg-charts
  x?: (index: number) => number;
  y?: (value: number) => number;
  ticks?: number[];
}

/**
 * GraphCursor component renders a cursor overlay on a chart to highlight the current data point
 * Displays a vertical line and circle indicator at the specified position
 * @param {GraphCursorProps} props - Component props
 * @param {number[]} props.data - Array of data values for the chart
 * @param {number} props.currentX - Current X position index for the cursor
 * @param {Function} props.x - Function to convert index to X coordinate (provided by AreaChart)
 * @param {Function} props.y - Function to convert value to Y coordinate (provided by AreaChart)
 * @param {string} props.color - Optional color for the cursor (defaults to theme success color)
 * @returns {JSX.Element|null} The rendered cursor component or null if invalid position
 */
const GraphCursor = ({ data, currentX, x, y, color }: GraphCursorProps) => {
  const { colors } = useTheme();

  const defaultColor = colors.success.default;

  if ((currentX && currentX < 0) || !data) return null;

  const selectedDailyApr = data[currentX];

  return (
    <G x={x?.(currentX)} key="tooltip">
      <G>
        <Line
          y1={1}
          y2={'100%'}
          stroke={color ?? defaultColor}
          strokeWidth={1}
        />
        <Circle
          cy={y?.(selectedDailyApr)}
          r={5}
          stroke={color ?? defaultColor}
          strokeWidth={1}
          fill={color ?? defaultColor}
        />
      </G>
    </G>
  );
};

export default GraphCursor;
