import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCompletedOnboarding } from '../../../../actions/onboarding';
import { RootState } from '../../../../reducers';
import { selectCompletedOnboarding } from '../../../../selectors/onboarding';

/**
 * Custom hook to ensure onboarding completion state is consistent with KeyringController state
 * Backfills the completedOnboarding state based on the presence of a vault in KeyringController
 * This logic is applied here instead of a migration because onboarding was previously blacklisted in persistConfig
 * Handles edge cases where users can reset completedOnboarding to false without setting it to true again
 */
export const useCompletedOnboardingEffect = () => {
  const dispatch = useDispatch();

  const vault = useSelector(
    (state: RootState) => state.engine.backgroundState.KeyringController.vault,
  );
  const hasCompletedOnboarding = useSelector(selectCompletedOnboarding);
  const hasVault = Boolean(vault);

  useEffect(() => {
    if (hasVault && !hasCompletedOnboarding) {
      dispatch(setCompletedOnboarding(true));
    }
  }, [hasVault, hasCompletedOnboarding, dispatch]);
};
