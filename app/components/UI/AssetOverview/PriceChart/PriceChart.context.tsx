import React, { createContext, useContext, useState } from 'react';

interface PriceChartContextType {
  isChartBeingTouched: boolean;
  setIsChartBeingTouched: React.Dispatch<React.SetStateAction<boolean>>;
}

const PriceChartContext = createContext<PriceChartContextType>({
  isChartBeingTouched: false,
  setIsChartBeingTouched: () => {
    throw new Error(
      'setIsChartBeingTouched() was called but no PriceChartProvider was found in the component tree.',
    );
  },
});

/**
 * Hook to access the PriceChart context
 * @returns {PriceChartContextType} The price chart context containing touch state and setter
 */
export const usePriceChart = () => useContext(PriceChartContext);

interface PriceChartProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component for PriceChart context
 * Manages the touch state for price chart interactions
 * @param {PriceChartProviderProps} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap with context
 * @returns {JSX.Element} Provider component wrapping children with price chart context
 */
export const PriceChartProvider = ({ children }: PriceChartProviderProps) => {
  const [isChartBeingTouched, setIsChartBeingTouched] =
    useState<boolean>(false);

  return (
    <PriceChartContext.Provider
      value={{ isChartBeingTouched, setIsChartBeingTouched }}
    >
      {children}
    </PriceChartContext.Provider>
  );
};

export default PriceChartContext;
