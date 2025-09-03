import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { useSelector } from 'react-redux';

import { selectChainId } from '../../../../selectors/networkController';

import { CardSDK } from './CardSDK';
import { selectCardFeatureFlag } from '../../../../selectors/featureFlagController/card';

export interface ICardSDK {
  sdk: CardSDK | null;
}

interface ProviderProps<T> {
  value?: T;
  children?: React.ReactNode;
}

const CardSDKContext = createContext<ICardSDK | undefined>(undefined);

/**
 * Provider component for CardSDK context
 * Initializes and manages the CardSDK instance based on feature flags and chain ID
 * @param {ProviderProps<ICardSDK>} props - Provider props
 * @param {ICardSDK} props.value - Optional CardSDK value to override default
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} CardSDK context provider
 */
export const CardSDKProvider = ({
  value,
  ...props
}: ProviderProps<ICardSDK>) => {
  const selectedChainId = useSelector(selectChainId);
  const cardFeatureFlag = useSelector(selectCardFeatureFlag);

  const [sdk, setSdk] = useState<CardSDK | null>(null);

  // Initialize CardholderSDK if card feature flag is enabled and chain ID is selected
  useEffect(() => {
    if (cardFeatureFlag && selectedChainId) {
      const cardSDK = new CardSDK({
        cardFeatureFlag,
        rawChainId: selectedChainId,
      });
      setSdk(cardSDK);
    } else {
      setSdk(null);
    }
  }, [cardFeatureFlag, selectedChainId]);

  const contextValue = useMemo(
    (): ICardSDK => ({
      sdk,
    }),
    [sdk],
  );

  return <CardSDKContext.Provider value={value || contextValue} {...props} />;
};

/**
 * Hook to access CardSDK from context
 * @returns {ICardSDK} The CardSDK context value
 * @throws {Error} If used outside of CardSDKProvider
 */
export const useCardSDK = () => {
  const contextValue = useContext(CardSDKContext);
  if (!contextValue) {
    throw new Error('useCardSDK must be used within a CardSDKProvider');
  }
  return contextValue;
};

export default CardSDKContext;
