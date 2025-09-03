import React, { useRef } from 'react';
import { View } from 'react-native';

import styleSheet from './SsnInfoModal.styles';

import Text, {
  TextVariant,
  TextColor,
} from '../../../../../../../component-library/components/Texts/Text';
import BottomSheet, {
  BottomSheetRef,
} from '../../../../../../../component-library/components/BottomSheets/BottomSheet';
import BottomSheetHeader from '../../../../../../../component-library/components/BottomSheets/BottomSheetHeader';

import { useStyles } from '../../../../../../hooks/useStyles';
import { createNavigationDetails } from '../../../../../../../util/navigation/navUtils';
import { strings } from '../../../../../../../../locales/i18n';
import Routes from '../../../../../../../constants/navigation/Routes';

/**
 * Creates navigation details for the SSN info modal
 * @returns {Object} Navigation details object for the SSN info modal
 */
export const createSsnInfoModalNavigationDetails = createNavigationDetails(
  Routes.DEPOSIT.MODALS.ID,
  Routes.DEPOSIT.MODALS.SSN_INFO,
);

/**
 * SSN Info Modal component that displays information about Social Security Number requirements
 * Renders a bottom sheet modal with explanatory text about why SSN is required for deposits
 * @returns {JSX.Element} The rendered SSN info modal component
 */
function SsnInfoModal() {
  const sheetRef = useRef<BottomSheetRef>(null);

  const { styles } = useStyles(styleSheet, {});

  return (
    <BottomSheet ref={sheetRef} shouldNavigateBack>
      <BottomSheetHeader onClose={() => sheetRef.current?.onCloseBottomSheet()}>
        <Text variant={TextVariant.HeadingMD} style={styles.headerTitle}>
          {strings('deposit.ssn_info_modal.title')}
        </Text>
      </BottomSheetHeader>

      <View style={styles.content}>
        <Text variant={TextVariant.BodyMD} color={TextColor.Default}>
          {strings('deposit.ssn_info_modal.description')}
        </Text>
      </View>
    </BottomSheet>
  );
}

export default SsnInfoModal;
