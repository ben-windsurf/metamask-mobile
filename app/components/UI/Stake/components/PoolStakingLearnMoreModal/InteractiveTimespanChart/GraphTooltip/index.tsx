import React from 'react';
import { View } from 'react-native';
import Text, {
  TextVariant,
  TextColor,
} from '../../../../../../../component-library/components/Texts/Text';
import { useStyles } from '../../../../../../hooks/useStyles';
import styleSheet from './GraphTooltip.styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export interface GraphTooltipProps {
  title: string;
  subtitle: string;
  color?: string;
  isLoading?: boolean;
}

/**
 * GraphTooltip component displays tooltip information for interactive charts
 * Shows title and subtitle text with optional loading state and custom color
 * @param {GraphTooltipProps} props - Component props
 * @param {string} props.title - Main title text to display
 * @param {string} props.subtitle - Subtitle text to display below title
 * @param {string} props.color - Optional color for the title text
 * @param {boolean} props.isLoading - Whether to show loading skeleton (default: false)
 * @returns {JSX.Element} Rendered tooltip component with title and subtitle or loading skeleton
 */
const GraphTooltip = ({
  title,
  subtitle,
  color,
  isLoading = false,
}: GraphTooltipProps) => {
  const { styles } = useStyles(styleSheet, {});

  if (isLoading) {
    return (
      <View style={styles.container}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item {...styles.containerSkeleton}>
            <SkeletonPlaceholder.Item
              width={126}
              height={32}
              borderRadius={8}
            />
            <SkeletonPlaceholder.Item
              width={102}
              height={22}
              borderRadius={8}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant={TextVariant.HeadingLG} color={color ?? TextColor.Success}>
        {title}
      </Text>
      <Text variant={TextVariant.BodyMDMedium} color={TextColor.Alternative}>
        {subtitle}
      </Text>
    </View>
  );
};

export default GraphTooltip;
