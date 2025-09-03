import React from 'react';
import { Path } from 'react-native-svg';
import { useTheme } from '../../../../../../../util/theme';

interface LineProps {
  line: string;
  doesChartHaveData: boolean;
  color?: string;
  testID?: string;
}

/**
 * PlotLine component renders an SVG path element for chart visualization
 * Displays a line with dynamic styling based on data availability and theme
 * @param {Partial<LineProps>} props - Component props
 * @param {string} props.line - SVG path data string for the line
 * @param {boolean} props.doesChartHaveData - Whether the chart contains data (affects styling)
 * @param {string} props.color - Optional custom color for the line
 * @param {string} props.testID - Test identifier for the component
 * @returns {JSX.Element} SVG Path element representing the plot line
 */
const PlotLine = ({
  line,
  doesChartHaveData,
  color,
  testID = 'InteractiveChartPlotLine',
}: Partial<LineProps>) => {
  const { colors: themeColors } = useTheme();

  const defaultColor = themeColors.success.default;

  const lineColor = color ?? defaultColor;

  return (
    <Path
      key="line"
      d={line}
      stroke={doesChartHaveData ? lineColor : themeColors.text.alternative}
      strokeWidth={1.75}
      fill="none"
      opacity={doesChartHaveData ? 1 : 0.85}
      testID={testID}
    />
  );
};

export default PlotLine;
