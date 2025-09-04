// AccountOverview selectors for E2E tests

/**
 * Selector IDs for AccountOverview component elements used in end-to-end testing.
 * Contains test identifiers for locating UI elements during automated testing.
 */
export const AccountOverviewSelectorsIDs = {
  /** Test ID for the navbar account button element */
  ACCOUNT_BUTTON: 'navbar-account-button',
} as const;

/**
 * Type definition for AccountOverview selector IDs.
 * Provides type safety for accessing AccountOverview test selectors.
 */
export type AccountOverviewSelectorsIDsType =
  typeof AccountOverviewSelectorsIDs;
