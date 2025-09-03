import React, { useContext, useMemo, useState } from 'react';

export interface ConfirmationContextParams {
  isTransactionValueUpdating: boolean;
  setIsTransactionValueUpdating: (isTransactionValueUpdating: boolean) => void;
}

// This context is used to share the valuable information between the components
// that are used to render the confirmation
const ConfirmationContext = React.createContext<ConfirmationContextParams>({
  isTransactionValueUpdating: false,
  // eslint-disable-next-line no-empty-function
  setIsTransactionValueUpdating: () => {},
});

interface ConfirmationContextProviderProps {
  children: React.ReactNode;
}

/**
 * ConfirmationContextProvider provides context for managing transaction confirmation state
 * Manages the transaction value updating state across confirmation components
 * @param {ConfirmationContextProviderProps} props - The provider props
 * @param {React.ReactNode} props.children - Child components that will have access to the confirmation context
 * @returns {JSX.Element} The context provider component
 */
export const ConfirmationContextProvider: React.FC<
  ConfirmationContextProviderProps
> = ({ children }) => {
  const [isTransactionValueUpdating, setIsTransactionValueUpdating] =
    useState(false);

  const contextValue = useMemo(
    () => ({
      isTransactionValueUpdating,
      setIsTransactionValueUpdating,
    }),
    [isTransactionValueUpdating, setIsTransactionValueUpdating],
  );

  return (
    <ConfirmationContext.Provider value={contextValue}>
      {children}
    </ConfirmationContext.Provider>
  );
};

/**
 * Custom hook to access the confirmation context
 * Provides access to transaction value updating state and setter function
 * @returns {ConfirmationContextParams} The confirmation context containing isTransactionValueUpdating state and setter
 * @throws {Error} When used outside of ConfirmationContextProvider
 */
export const useConfirmationContext = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error(
      'useConfirmationContext must be used within a ConfirmationContextProvider',
    );
  }
  return context;
};
