import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import Icon, {
  IconName,
  IconSize,
} from '../../../../../component-library/components/Icons/Icon';
import { useStyles } from '../../../../../component-library/hooks';
import {
  EditSpendingCapModal,
  type EditSpendingCapProps,
} from '../modals/edit-spending-cap-modal';
import styleSheet from './edit-spending-cap.styles';

/**
 * EditSpendingCapButton component provides a button interface for editing spending cap limits
 * Renders a touchable button with an edit icon that opens a modal for modifying spending cap values
 * Used in confirmation flows to allow users to adjust token spending allowances
 * @param {Object} props - Component props
 * @param {EditSpendingCapProps} props.spendingCapProps - Properties for the spending cap modal
 * @param {React.ReactNode} [props.children] - Optional child components to render alongside the edit icon
 * @returns {JSX.Element} The rendered edit spending cap button component
 */
export const EditSpendingCapButton = ({
  spendingCapProps,
  children,
}: {
  spendingCapProps: EditSpendingCapProps;
  children?: React.ReactNode;
}) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const { styles, theme } = useStyles(styleSheet, {});

  const openModal = useCallback(
    () => setModalVisibility(true),
    [setModalVisibility],
  );

  const closeModal = useCallback(
    () => setModalVisibility(false),
    [setModalVisibility],
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={openModal}
      testID="edit-spending-cap-button"
    >
      {/*
        react-native-modal is patched right now and it puts an extra <View/>
        Keep modal as first child to avoid layout shift caused by "gap" style
      */}
      {isModalVisible && (
        <EditSpendingCapModal onClose={closeModal} {...spendingCapProps} />
      )}
      <Icon
        name={IconName.Edit}
        size={IconSize.Md}
        color={theme.colors.info.default}
      />
      {children}
    </TouchableOpacity>
  );
};
