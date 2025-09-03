import React from 'react';
import { TokenI } from '../../types';
import useIsOriginalNativeTokenSymbol from '../../../../hooks/useIsOriginalNativeTokenSymbol/useIsOriginalNativeTokenSymbol';
import { useSelector } from 'react-redux';
import {
  selectChainId,
  selectProviderConfig,
  selectEvmTicker,
} from '../../../../../selectors/networkController';
import ButtonIcon, {
  ButtonIconSizes,
} from '../../../../../../app/component-library/components/Buttons/ButtonIcon';
import {
  IconColor,
  IconName,
} from '../../../../../component-library/components/Icons/Icon';

interface ScamWarningIconProps {
  asset: TokenI;
  setShowScamWarningModal: (arg: boolean) => void;
}

/**
 * ScamWarningIcon component displays a warning icon for potentially fraudulent tokens
 * Shows a danger icon when a token claims to be ETH but is not the original native token
 * @param {Object} props - Component props
 * @param {TokenI} props.asset - The token asset to check for scam indicators
 * @param {Function} props.setShowScamWarningModal - Function to show the scam warning modal
 * @returns {JSX.Element|null} Warning icon button or null if no warning needed
 */
export const ScamWarningIcon = ({
  asset,
  setShowScamWarningModal,
}: ScamWarningIconProps) => {
  const { type } = useSelector(selectProviderConfig);
  const chainId = useSelector(selectChainId);
  const ticker = useSelector(selectEvmTicker);
  const isOriginalNativeTokenSymbol = useIsOriginalNativeTokenSymbol(
    chainId,
    ticker,
    type,
  );
  if (!isOriginalNativeTokenSymbol && asset.isETH) {
    return (
      <ButtonIcon
        iconName={IconName.Danger}
        onPressIn={() => {
          setShowScamWarningModal(true);
        }}
        iconColor={IconColor.Error}
        size={ButtonIconSizes.Lg}
      />
    );
  }
  return null;
};
