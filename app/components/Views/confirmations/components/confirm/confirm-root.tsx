import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

import Routes from '../../../../../constants/navigation/Routes';
import { useFullScreenConfirmation } from '../../hooks/ui/useFullScreenConfirmation';
import { useConfirmationRedesignEnabled } from '../../hooks/useConfirmationRedesignEnabled';

/**
 * ConfirmRoot component handles navigation logic for confirmation flows
 * Determines whether to use the redesigned confirmation UI and navigates to appropriate screens
 * Returns null as it only handles navigation side effects without rendering UI
 * @returns {null} Always returns null as this is a navigation-only component
 */
export const ConfirmRoot = () => {
  const { isRedesignedEnabled } = useConfirmationRedesignEnabled();
  const { isFullScreenConfirmation } = useFullScreenConfirmation();
  const navigation = useNavigation();

  useEffect(() => {
    if (isRedesignedEnabled) {
      if (isFullScreenConfirmation) {
        return;
      }
      navigation.navigate(Routes.CONFIRMATION_REQUEST_MODAL);
    }
  }, [isFullScreenConfirmation, isRedesignedEnabled, navigation]);

  return null;
};
