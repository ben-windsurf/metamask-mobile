import { useDispatch } from 'react-redux';
import { strings } from '../../../../../../locales/i18n';
import { showAlert } from '../../../../../actions/alert';
import { protectWalletModalVisible } from '../../../../../actions/user';
import ClipboardManager from '../../../../../core/ClipboardManager';

/**
 * Alert message configuration object for clipboard copy operations
 * Provides localized messages for different types of clipboard copy actions in notifications
 */
export const CopyClipboardAlertMessage = {
  default: (): string => strings('notifications.copied_to_clipboard'),
  address: (): string => strings('notifications.address_copied_to_clipboard'),
  transaction: (): string =>
    strings('notifications.transaction_id_copied_to_clipboard'),
};

/**
 * Custom hook for copying content to clipboard with user feedback
 * Provides clipboard functionality with alert notifications and wallet protection modal trigger
 * @returns {Function} copyToClipboard function that copies text and shows confirmation alert
 */
function useCopyClipboard() {
  const dispatch = useDispatch();

  const handleShowAlert = (config: {
    isVisible: boolean;
    autodismiss: number;
    content: string;
    data: { msg: string };
  }) => dispatch(showAlert(config));

  const handleProtectWalletModalVisible = () =>
    dispatch(protectWalletModalVisible());

  const copyToClipboard = async (value: string, alertText?: string) => {
    if (!value) return;
    await ClipboardManager.setString(value);
    handleShowAlert({
      isVisible: true,
      autodismiss: 1500,
      content: 'clipboard-alert',
      data: {
        msg: alertText ?? CopyClipboardAlertMessage.default(),
      },
    });
    setTimeout(() => handleProtectWalletModalVisible(), 2000);
  };

  return copyToClipboard;
}

export default useCopyClipboard;
