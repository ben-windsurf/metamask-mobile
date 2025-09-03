import React, {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigation, NavigationAction } from '@react-navigation/native';

import Engine from '../../../../../core/Engine';
import { IQRState } from '../../../../UI/QRHardware/types';
import { useCamera } from './useCamera';
import { useQRHardwareAwareness } from './useQRHardwareAwareness';

export interface QRHardwareContextType {
  QRState?: IQRState;
  cameraError: string | undefined;
  cancelQRScanRequestIfPresent: () => Promise<void>;
  isQRSigningInProgress: boolean;
  isSigningQRObject: boolean;
  needsCameraPermission: boolean;
  scannerVisible: boolean;
  setRequestCompleted: () => void;
  setScannerVisible: (visibility: boolean) => void;
}

/**
 * React context for managing QR hardware wallet operations and state
 * Provides access to QR signing state, camera permissions, and scanner visibility
 * Used throughout the confirmation flow for hardware wallet interactions
 */
export const QRHardwareContext = createContext<QRHardwareContextType>({
  QRState: undefined,
  cameraError: undefined,
  cancelQRScanRequestIfPresent: () => Promise.resolve(),
  isQRSigningInProgress: false,
  isSigningQRObject: false,
  needsCameraPermission: false,
  scannerVisible: false,
  setRequestCompleted: () => undefined,
  setScannerVisible: () => undefined,
});

/**
 * Context provider component for QR hardware wallet functionality
 * Manages QR signing state, camera permissions, and navigation handling for hardware wallets
 * Automatically cancels QR requests when navigating away from confirmation screens
 * @param {Object} props - Component props
 * @param {ReactElement[] | ReactElement} props.children - Child components to wrap with context
 * @returns {JSX.Element} Provider component wrapping children with QR hardware context
 */
export const QRHardwareContextProvider: React.FC<{
  children: ReactElement[] | ReactElement;
}> = ({ children }) => {
  const navigation = useNavigation();
  const { isQRSigningInProgress, isSigningQRObject, QRState } =
    useQRHardwareAwareness();
  const { cameraError, hasCameraPermission } = useCamera(isSigningQRObject);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [isRequestCompleted, setRequestCompleted] = useState(false);

  const KeyringController = Engine.context.KeyringController;

  const cancelRequest = useCallback(
    (e: { preventDefault: () => void; data: { action: NavigationAction } }) => {
      if (isRequestCompleted) {
        return;
      }
      e.preventDefault();
      KeyringController.cancelQRSignRequest().then(() => {
        navigation.dispatch(e.data.action);
      });
    },
    [KeyringController, isRequestCompleted, navigation],
  );

  useEffect(() => {
    navigation.addListener('beforeRemove', cancelRequest);
    return () => navigation.removeListener('beforeRemove', cancelRequest);
  }, [cancelRequest, navigation]);

  const cancelQRScanRequestIfPresent = useCallback(async () => {
    if (!isQRSigningInProgress) {
      return;
    }
    await KeyringController.cancelQRSignRequest();
    setRequestCompleted(true);
    setScannerVisible(false);
  }, [
    KeyringController,
    isQRSigningInProgress,
    setRequestCompleted,
    setScannerVisible,
  ]);

  return (
    <QRHardwareContext.Provider
      value={{
        QRState,
        cameraError,
        cancelQRScanRequestIfPresent,
        isQRSigningInProgress,
        isSigningQRObject,
        needsCameraPermission: isQRSigningInProgress && !hasCameraPermission,
        scannerVisible,
        setRequestCompleted: () => setRequestCompleted(true),
        setScannerVisible,
      }}
    >
      {children}
    </QRHardwareContext.Provider>
  );
};

/**
 * Custom hook to access QR hardware wallet context
 * Provides access to QR signing state, camera error handling, and scanner controls
 * Must be used within a QRHardwareContextProvider
 * @returns {QRHardwareContextType} QR hardware context containing state and control functions
 * @throws {Error} When used outside of QRHardwareContextProvider
 */
export const useQRHardwareContext = () => {
  const context = useContext(QRHardwareContext);
  if (!context) {
    throw new Error(
      'useQRHardwareContext must be used within an QRHardwareContextProvider',
    );
  }
  return context;
};
