import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCompletedOnboarding } from '../../../../actions/onboarding';
import { RootState } from '../../../../reducers';
import { selectCompletedOnboarding } from '../../../../selectors/onboarding';

/**
 * Custom hook to backfill the completedOnboarding state based on the KeyringController state.
 *
 * This hook ensures that the completedOnboarding state is always consistent with the KeyringController state.
 * The logic is applied here instead of a migration because `onboarding` was previously blacklisted in `persistConfig`.
 * Another reason is that there are flows where users can reset `completedOnboarding` to `false` without ever setting it to `true` again,
 * such as when they delete their wallet, go through onboarding again, and kill the app before entirely completing the onboarding flow.
 *
 * @returns void - This hook doesn't return anything, it only manages side effects
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
