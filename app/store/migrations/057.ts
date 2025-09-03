import { migration52 } from './052';

/**
 * Migration for ensuring that selectedAccount on the AccountsController is defined
 * Re-uses logic from migration 52
 * We have to re-run 52 as 57 because we fixed it in dfcd8c87a19a8d38553aa6a9742b1e7683be9e93
 * and users who already had 52 ran would not have the fix
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with AccountsController selectedAccount properly defined
 */
export default function migrate(state: unknown) {
  return migration52(state, 57);
}
