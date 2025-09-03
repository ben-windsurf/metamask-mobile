import React, { ReactNode, useState } from 'react';
import { View } from 'react-native';
import ButtonIcon, {
  ButtonIconSizes,
} from '../../../../../../component-library/components/Buttons/ButtonIcon';
import {
  IconColor,
  IconName,
} from '../../../../../../component-library/components/Icons/Icon';
import Text from '../../../../../../component-library/components/Texts/Text';
import { useStyles } from '../../../../../../component-library/hooks';
import BottomModal from '../bottom-modal';
import styleSheet from './Tooltip.styles';

interface TooltipProps {
  content: string | ReactNode;
  iconColor?: IconColor;
  onPress?: () => void;
  title?: string;
  tooltipTestId?: string;
}

interface TooltipModalProps {
  content: string | ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  tooltipTestId?: string;
}

/**
 * TooltipModal component displays tooltip content in a bottom modal overlay
 * Provides a modal interface for showing detailed information with close functionality
 * Used in confirmation flows to display contextual help and explanations
 * @param {TooltipModalProps} props - The tooltip modal props
 * @param {boolean} props.open - Whether the modal is visible
 * @param {function} props.setOpen - Function to control modal visibility
 * @param {string | ReactNode} props.content - Content to display in the modal
 * @param {string} [props.title] - Optional title for the modal header
 * @param {string} [props.tooltipTestId] - Test ID for the modal component
 * @returns {JSX.Element} The rendered tooltip modal component
 */
export const TooltipModal = ({
  open,
  setOpen,
  content,
  title,
  tooltipTestId = 'tooltip-modal',
}: TooltipModalProps) => {
  const { styles } = useStyles(styleSheet, { title: title ?? '' });

  return (
    <BottomModal visible={open} onClose={() => setOpen(false)} isTooltip>
      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <ButtonIcon
            iconColor={IconColor.Default}
            iconName={IconName.ArrowLeft}
            onPress={() => setOpen(false)}
            size={ButtonIconSizes.Sm}
            style={styles.closeModalBtn}
            testID={`${tooltipTestId}-close-btn`}
          />
          {<Text style={styles.modalTitle}>{title ?? ''}</Text>}
        </View>
        <View style={styles.modalContent}>
          {typeof content === 'string' ? (
            <Text style={styles.modalContentValue}>{content}</Text>
          ) : (
            content
          )}
        </View>
      </View>
    </BottomModal>
  );
};

const Tooltip = ({
  content,
  title,
  tooltipTestId = 'info-row-tooltip',
  onPress,
  iconColor = IconColor.Muted,
}: TooltipProps) => {
  const [open, setOpen] = useState(false);

  const handlePress = () => {
    setOpen(true);
    onPress?.();
  };

  return (
    <View>
      <ButtonIcon
        iconColor={iconColor}
        iconName={IconName.Info}
        onPress={handlePress}
        size={ButtonIconSizes.Sm}
        testID={`${tooltipTestId}-open-btn`}
      />
      <TooltipModal
        open={open}
        setOpen={setOpen}
        content={content}
        title={title}
        tooltipTestId={tooltipTestId}
      />
    </View>
  );
};

export default Tooltip;
