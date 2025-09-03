import { ErrorHandlerCallback } from 'react-native';

let reactNativeDefaultHandler: ErrorHandlerCallback;

/**
 * Set the default error handler from react-native
 * @param {ErrorHandlerCallback} handler - The React Native error handler callback function
 */
export const setReactNativeDefaultHandler = (handler: ErrorHandlerCallback) => {
  reactNativeDefaultHandler = handler;
};

/**
 * Handles custom error processing for MetaMask Mobile, filtering out specific hardware wallet errors
 * to prevent app crashes while allowing other errors to be handled by the default React Native handler
 * @param {Error} error - The error object to handle
 * @param {boolean} isFatal - Whether the error is fatal and should crash the app
 */
export const handleCustomError = (error: Error, isFatal: boolean) => {
  // Check whether the error is from the Ledger native bluetooth errors.
  if (
    error.name === 'EthAppPleaseEnableContractData' ||
    error.name === 'TransportStatusError' ||
    error.name === 'DisconnectedDevice'
  ) {
    // dont pass the error to react native error handler to prevent app crash
    console.error('Ledger error: ', error.message);
    // check error message contain "KeystoneError#Tx_canceled"
  } else if (
    error.name === 'Error' &&
    error.message?.includes('KeystoneError#Tx_canceled')
  ) {
    console.error('Keystone error: ', error.message);
  } else {
    // Pass the error to react native error handler
    reactNativeDefaultHandler(error, isFatal);
  }
};

/**
 * Gets the currently set React Native default error handler
 * @returns {ErrorHandlerCallback} The React Native error handler callback function
 */
export const getReactNativeDefaultHandler = () => reactNativeDefaultHandler;
