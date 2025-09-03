import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text, {
  TextVariant,
} from '../../../../../../component-library/components/Texts/Text';
import { useStyles } from '../../../../../../component-library/hooks';
import { TooltipModal } from '../Tooltip/Tooltip';
import styleSheet from './hero.styles';

interface TitleProps {
  title: React.ReactNode | string;
  setIsModalVisible?: (isModalVisible: boolean) => void;
  styles: StyleSheet.NamedStyles<Record<string, unknown>>;
}

const Title = ({ title, setIsModalVisible, styles }: TitleProps) => {
  const isStringTitle = typeof title === 'string';

  return (
    <View style={styles.title}>
      {setIsModalVisible ? (
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          {isStringTitle ? (
            <Text style={styles.titleText} variant={TextVariant.HeadingLG}>
              {title}
            </Text>
          ) : (
            title
          )}
        </TouchableOpacity>
      ) : isStringTitle ? (
        <Text style={styles.titleText} variant={TextVariant.HeadingLG}>
          {title}
        </Text>
      ) : (
        title
      )}
    </View>
  );
};

interface HeroProps {
  componentAsset: React.ReactNode;
  title: React.ReactNode | string;

  hasPaddingTop?: boolean;
  subtitle?: string;
  tooltipModalProps?: {
    hasTooltip?: boolean;
    isEnabled?: boolean;
    content?: string;
    title?: string;
    testId?: string;
  };
}

/**
 * Hero component displays a prominent header section with an asset, title, and optional subtitle
 * Used in confirmation flows to present key information with optional tooltip functionality
 * @param {HeroProps} props - The component props
 * @param {React.ReactNode} props.componentAsset - The main visual asset to display (icon, image, etc.)
 * @param {React.ReactNode | string} props.title - The hero title, can be a string or custom React element
 * @param {boolean} [props.hasPaddingTop=false] - Whether to add top padding to the hero section
 * @param {string} [props.subtitle] - Optional subtitle text to display below the title
 * @param {Object} [props.tooltipModalProps={}] - Configuration for optional tooltip modal
 * @param {boolean} [props.tooltipModalProps.hasTooltip] - Whether tooltip functionality is available
 * @param {boolean} [props.tooltipModalProps.isEnabled] - Whether tooltip modal is enabled
 * @param {string} [props.tooltipModalProps.content] - Tooltip modal content text
 * @param {string} [props.tooltipModalProps.title] - Tooltip modal title
 * @param {string} [props.tooltipModalProps.testId] - Test ID for tooltip modal
 * @returns {JSX.Element} The rendered Hero component
 * @example
 *
 * <Hero
 *   componentAsset={<Asset />}
 *   hasPaddingTop
 *   subtitle="Subtitle"
 *   title={<Title />}
 *   tooltipModalProps={{ hasTooltip: true, isEnabled: true, content: 'Tooltip content', title: 'Tooltip title', testId: 'tooltip-modal' }}
 * />
 */
export const Hero = ({
  componentAsset,
  hasPaddingTop = false,
  subtitle,
  title,
  tooltipModalProps = {},
}: HeroProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { styles } = useStyles(styleSheet, {
    hasPaddingTop,
  });

  return (
    <View style={styles.base}>
      {componentAsset}
      <Title
        title={title}
        setIsModalVisible={
          tooltipModalProps.isEnabled ? setIsModalVisible : undefined
        }
        styles={styles}
      />
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {tooltipModalProps.isEnabled && (
        <TooltipModal
          open={isModalVisible}
          setOpen={setIsModalVisible}
          content={tooltipModalProps.content}
          title={tooltipModalProps.title}
          tooltipTestId={tooltipModalProps.testId}
        />
      )}
    </View>
  );
};
