import React from 'react';
import { View } from 'react-native';
import { useStyles } from '../../../../../../component-library/hooks';
import styleSheet from './gas-modal-header.styles';

import ButtonIcon, {
  ButtonIconSizes,
} from '../../../../../../component-library/components/Buttons/ButtonIcon';
import { IconName } from '../../../../../../component-library/components/Icons/Icon';
import Text, {
  TextVariant,
} from '../../../../../../component-library/components/Texts/Text';

/**
 * GasModalHeader component renders a header for gas-related modals with a back button and title
 * Provides consistent navigation and title display for gas fee configuration screens
 * @param {Object} props - Component props
 * @param {() => void} props.onBackButtonClick - Callback function triggered when back button is pressed
 * @param {string} props.title - Title text to display in the header
 * @returns {JSX.Element} The rendered gas modal header component
 */
export const GasModalHeader = ({
  onBackButtonClick,
  title,
}: {
  onBackButtonClick: () => void;
  title: string;
}) => {
  const { styles } = useStyles(styleSheet, {});

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <ButtonIcon
          iconName={IconName.ArrowLeft}
          onPress={onBackButtonClick}
          size={ButtonIconSizes.Sm}
          testID="back-button"
        />
      </View>
      <Text variant={TextVariant.HeadingMD} style={styles.title}>
        {title}
      </Text>
    </View>
  );
};
