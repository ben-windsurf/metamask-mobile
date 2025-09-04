import { ErrorHandlerCallback } from 'react-native';

let reactNativeDefaultHandler: ErrorHandlerCallback;

/**
 * Set the default error handler from react-native
 * @param handler
 */
export const setReactNativeDefaultHandler = (handler: ErrorHandlerCallback) => {
  reactNativeDefaultHandler = handler;
};

/**
 * Handle custom errors with special handling for Ledger and Keystone errors
 * @param error - The error object to handle
 * @param isFatal - Whether the error is fatal and should crash the app
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
 * Get the current React Native default error handler
 * @returns The current default error handler callback
 */
export const getReactNativeDefaultHandler = () => reactNativeDefaultHandler;
