import { useAdvancedGasFeeOption } from './useAdvancedGasFeeOption';
import { useGasFeeEstimateLevelOptions } from './useGasFeeEstimateLevelOptions';
import { useGasPriceEstimateOption } from './useGasPriceEstimateOption';
import { useDappSuggestedGasFeeOption } from './useDappSuggestedGasFeeOption';
import { GasModalType } from '../../constants/gas';
import { type GasOption } from '../../types/gas';

/**
 * Custom hook that aggregates all available gas fee options for transaction confirmations
 * Combines advanced gas fees, estimate levels, price estimates, and dapp-suggested options
 * @param {Object} params - Hook parameters
 * @param {() => void} params.handleCloseModals - Function to close gas-related modals
 * @param {(modal: GasModalType) => void} params.setActiveModal - Function to set the active gas modal
 * @returns {Object} Object containing all available gas options for user selection
 */
export const useGasOptions = ({
  handleCloseModals,
  setActiveModal,
}: {
  handleCloseModals: () => void;
  setActiveModal: (modal: GasModalType) => void;
}) => {
  const advancedGasFeeOptions = useAdvancedGasFeeOption({
    setActiveModal,
  });

  const gasFeeEstimateLevelOptions = useGasFeeEstimateLevelOptions({
    handleCloseModals,
  });

  const gasPriceEstimateOptions = useGasPriceEstimateOption({
    handleCloseModals,
  });

  const dappSuggestedGasFeeOption = useDappSuggestedGasFeeOption({
    handleCloseModals,
  });

  const options: GasOption[] = [
    ...gasFeeEstimateLevelOptions,
    ...gasPriceEstimateOptions,
    ...dappSuggestedGasFeeOption,
    ...advancedGasFeeOptions,
  ];

  return {
    options,
  };
};
