import React, { useState, useEffect } from 'react';
import {
  AppState,
  AppStateStatus,
  NativeEventSubscription,
  View,
} from 'react-native';
import { useStyles } from '../../../component-library/hooks/useStyles';
import Device from '../../../util/device';
import styleSheet from './styles';
import { PRIVACY_OVERLAY_TEST_ID } from './constants';

/**
 * Privacy overlay component that displays a blank overlay when the app goes to background
 * or becomes inactive to prevent sensitive information from being visible in app switcher
 * or screenshots. Automatically shows/hides based on app state changes.
 * @returns {JSX.Element|null} A blank overlay view when app is backgrounded, null when active
 */
export default function PrivacyOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);
  const { styles } = useStyles(styleSheet, {});

  useEffect(() => {
    let androidBlurListener: NativeEventSubscription;
    let androidFocusListener: NativeEventSubscription;

    const handleAppStateChange = (action: AppStateStatus) => {
      setShowOverlay(() => {
        switch (action) {
          case 'background':
          case 'inactive':
            return true;
          case 'active':
            return false;
          default:
            return false;
        }
      });
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    if (Device.isAndroid()) {
      androidBlurListener = AppState.addEventListener('blur', () =>
        handleAppStateChange('inactive'),
      );

      androidFocusListener = AppState.addEventListener('focus', () =>
        handleAppStateChange('active'),
      );
    }

    return () => {
      subscription.remove();
      if (Device.isAndroid()) {
        androidBlurListener.remove();
        androidFocusListener.remove();
      }
    };
  }, []);

  if (!showOverlay) return null;

  return <View style={styles.view} testID={PRIVACY_OVERLAY_TEST_ID} />;
}
