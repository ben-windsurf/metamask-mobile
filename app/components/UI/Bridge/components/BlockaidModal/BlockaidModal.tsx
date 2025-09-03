import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { strings } from '../../../../../../locales/i18n';
import BottomSheet, {
  BottomSheetRef,
} from '../../../../../component-library/components/BottomSheets/BottomSheet';
import BottomSheetHeader from '../../../../../component-library/components/BottomSheets/BottomSheetHeader';
import BottomSheetFooter from '../../../../../component-library/components/BottomSheets/BottomSheetFooter';
import Text, {
  TextVariant,
} from '../../../../../component-library/components/Texts/Text';
import {
  ButtonSize,
  ButtonVariants,
} from '../../../../../component-library/components/Buttons/Button';
import { useStyles } from '../../../../../component-library/hooks';

/**
 * Creates styles for the BlockaidModal component
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = () =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    footer: {
      paddingVertical: 20,
      paddingHorizontal: 16,
    },
    errorMessage: {
      textAlign: 'center',
    },
  });

interface BlockaidModalRouteParams {
  errorMessage: string;
  errorType: 'validation' | 'simulation';
}

/**
 * BlockaidModal component displays security warnings and validation errors from Blockaid
 * Shows error messages in a bottom sheet modal with options to go back
 * @returns {JSX.Element} The rendered BlockaidModal component
 */
const BlockaidModal = () => {
  const navigation = useNavigation();
  const sheetRef = useRef<BottomSheetRef>(null);
  const { styles } = useStyles(createStyles, {});
  const route =
    useRoute<RouteProp<{ params: BlockaidModalRouteParams }, 'params'>>();
  const { errorMessage, errorType } = route.params;

  const handleClose = () => {
    navigation.goBack();
  };

  const footerButtonProps = [
    {
      label: strings('blockaid_modal.go_back'),
      variant: ButtonVariants.Primary,
      size: ButtonSize.Lg,
      onPress: handleClose,
    },
  ];

  return (
    <BottomSheet ref={sheetRef}>
      <BottomSheetHeader onClose={handleClose}>
        <Text variant={TextVariant.HeadingMD}>
          {strings(`blockaid_modal.${errorType}_title`)}
        </Text>
      </BottomSheetHeader>
      <View style={styles.container}>
        <Text variant={TextVariant.BodyMD} style={styles.errorMessage}>
          {errorMessage}
        </Text>
      </View>
      <BottomSheetFooter
        buttonPropsArray={footerButtonProps}
        style={styles.footer}
      />
    </BottomSheet>
  );
};

export default BlockaidModal;
