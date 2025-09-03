import React, { useState } from 'react';
import { TextStyle, View } from 'react-native';
import ButtonLink from '../../../../component-library/components/Buttons/Button/variants/ButtonLink';
import { useStyles } from '../../../../component-library/hooks';
import Text, {
  TextColor,
  TextVariant,
} from '../../../../component-library/components/Texts/Text';
import styleSheet from './ContentDisplay.styles';
import { strings } from '../../../../../locales/i18n';

interface ContentDisplayProps {
  content: string;
  numberOfLines?: number;
  disclaimer?: string;
  textStyle?: TextStyle;
}

/**
 * ContentDisplay component renders expandable text content with show more/less functionality
 * Displays content with a configurable number of lines and optional disclaimer text
 * @param {ContentDisplayProps} props - Component props
 * @param {string} props.content - The main text content to display
 * @param {number} props.numberOfLines - Number of lines to show when collapsed (default: 3)
 * @param {string} props.disclaimer - Optional disclaimer text shown when expanded
 * @param {TextStyle} props.textStyle - Optional custom text styling
 * @returns {JSX.Element} Expandable content display with toggle button
 */
const ContentDisplay = ({
  content,
  numberOfLines = 3,
  disclaimer,
  textStyle,
}: ContentDisplayProps) => {
  const { styles } = useStyles(styleSheet, {});

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <Text
        numberOfLines={isExpanded ? undefined : numberOfLines}
        color={TextColor.Alternative}
        style={[textStyle]}
      >
        {content}
      </Text>
      {disclaimer && isExpanded && (
        <Text
          color={TextColor.Alternative}
          variant={TextVariant.BodyXS}
          style={styles.disclaimer}
        >
          {disclaimer}
        </Text>
      )}
      <ButtonLink
        onPress={toggleContent}
        label={strings(
          isExpanded
            ? 'asset_overview.about_content_display.show_less'
            : 'asset_overview.about_content_display.show_more',
        )}
      />
    </View>
  );
};

export default ContentDisplay;
