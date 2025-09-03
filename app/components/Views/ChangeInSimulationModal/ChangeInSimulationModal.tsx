import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { strings } from '../../../../locales/i18n';
import BottomSheet, {
  BottomSheetRef,
} from '../../../component-library/components/BottomSheets/BottomSheet';
import Button from '../../../component-library/components/Buttons/Button/Button';
import Icon, {
  IconSize,
  IconName,
  IconColor,
} from '../../../component-library/components/Icons/Icon';
import {
  ButtonSize,
  ButtonVariants,
  ButtonWidthTypes,
} from '../../../component-library/components/Buttons/Button';
import SheetHeader from '../../../component-library/components/Sheet/SheetHeader';
import Text from '../../../component-library/components/Texts/Text';

/**
 * Test ID for the proceed button in the change in simulation modal
 * Used for automated testing and UI element identification
 */
export const PROCEED_BUTTON_TEST_ID = 'proceed-button';

/**
 * Test ID for the reject button in the change in simulation modal
 * Used for automated testing and UI element identification
 */
export const REJECT_BUTTON_TEST_ID = 'reject-button';

const createStyles = () =>
  StyleSheet.create({
    buttonsWrapper: {
      alignSelf: 'stretch',
      flexDirection: 'column',
      gap: 16,
      paddingTop: 24,
    },
    wrapper: {
      alignItems: 'center',
      padding: 16,
    },
    description: {
      textAlign: 'center',
    },
  });

/**
 * ChangeInSimulationModal displays a warning modal when transaction simulation results change
 * Allows users to proceed with or reject the transaction after simulation changes are detected
 * Used in the transaction confirmation flow to ensure users are aware of simulation updates
 * @param {Object} props - Component props
 * @param {Object} props.route - Navigation route object containing callback functions
 * @param {Object} props.route.params - Route parameters
 * @param {Function} props.route.params.onProceed - Callback function when user chooses to proceed
 * @param {Function} props.route.params.onReject - Callback function when user chooses to reject
 * @returns {JSX.Element} The rendered change in simulation modal component
 */
const ChangeInSimulationModal = ({
  route,
}: {
  route: { params: { onProceed: () => void; onReject: () => void } };
}) => {
  const styles = createStyles();
  const sheetRef = useRef<BottomSheetRef>(null);
  const { onProceed, onReject } = route.params;

  const handleProceed = useCallback(() => {
    sheetRef.current?.onCloseBottomSheet();
    onProceed();
  }, [onProceed, sheetRef]);

  const handleReject = useCallback(() => {
    sheetRef.current?.onCloseBottomSheet();
    onReject();
  }, [onReject, sheetRef]);

  return (
    <BottomSheet ref={sheetRef}>
      <View style={styles.wrapper}>
        <Icon
          color={IconColor.Error}
          name={IconName.Warning}
          size={IconSize.Xl}
        />
        <SheetHeader title={strings('change_in_simulation_modal.title')} />
        <Text>{strings('change_in_simulation_modal.description')}</Text>
        <View style={styles.buttonsWrapper}>
          <Button
            label={strings('change_in_simulation_modal.reject')}
            onPress={handleReject}
            size={ButtonSize.Lg}
            testID={REJECT_BUTTON_TEST_ID}
            variant={ButtonVariants.Primary}
            width={ButtonWidthTypes.Full}
          />
          <Button
            label={strings('change_in_simulation_modal.proceed')}
            onPress={handleProceed}
            size={ButtonSize.Lg}
            testID={PROCEED_BUTTON_TEST_ID}
            variant={ButtonVariants.Secondary}
            width={ButtonWidthTypes.Full}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default ChangeInSimulationModal;
