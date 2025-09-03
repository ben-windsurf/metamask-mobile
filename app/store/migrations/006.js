import DefaultPreference from 'react-native-default-preference';
import {
  ONBOARDING_WIZARD,
  METRICS_OPT_IN,
  AGREED,
  DENIED,
  EXPLORED,
} from '../../constants/storage';

/**
 * Migration 006: Sets up analytics preferences and onboarding wizard state
 * Migrates analytics enabled state to native preferences and marks onboarding wizard as explored
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state
 */
export default function migrate(state) {
  state.analytics?.enabled
    ? DefaultPreference.set(METRICS_OPT_IN, AGREED)
    : DefaultPreference.set(METRICS_OPT_IN, DENIED);
  DefaultPreference.set(ONBOARDING_WIZARD, EXPLORED);

  return state;
}
