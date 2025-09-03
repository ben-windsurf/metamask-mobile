import { v1 as random } from 'uuid';

/**
 * Migration 013: Migrates approved hosts from privacy state to PermissionController
 * Converts legacy approvedHosts format to the new PermissionController subjects format
 * with proper eth_accounts permissions and caveats for connected dapps
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with PermissionController subjects
 */
export default function migrate(state) {
  // If for some reason we already have PermissionController state, bail out.
  const hasPermissionControllerState = Boolean(
    state.engine.backgroundState.PermissionController?.subjects,
  );
  if (hasPermissionControllerState) return state;

  const { approvedHosts } = state.privacy;
  const { selectedAddress } =
    state.engine.backgroundState.PreferencesController;

  const hosts = Object.keys(approvedHosts);
  // If no dapps connected, bail out.
  if (hosts.length < 1) return state;

  const { subjects } = hosts.reduce(
    (accumulator, host, index) => ({
      subjects: {
        ...accumulator.subjects,
        [host]: {
          origin: host,
          permissions: {
            eth_accounts: {
              id: random(),
              parentCapability: 'eth_accounts',
              invoker: host,
              caveats: [
                {
                  type: 'restrictReturnedAccounts',
                  value: [
                    {
                      address: selectedAddress,
                      lastUsed: Date.now() - index,
                    },
                  ],
                },
              ],
              date: Date.now(),
            },
          },
        },
      },
    }),
    {},
  );

  const newState = { ...state };

  newState.engine.backgroundState.PermissionController = {
    subjects,
  };
  return newState;
}
