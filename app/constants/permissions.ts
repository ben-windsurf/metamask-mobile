/* eslint-disable import/prefer-default-export */

/**
 * Enumeration of user intent types for permission-related actions.
 * Used to track and categorize different user interactions with the wallet.
 */
export enum USER_INTENT {
  /** No specific user intent */
  None,
  /** User intends to create a new item */
  Create,
  /** User intends to create multiple items */
  CreateMultiple,
  /** User intends to edit multiple items */
  EditMultiple,
  /** User intends to confirm an action */
  Confirm,
  /** User intends to cancel an action */
  Cancel,
  /** User intends to import data */
  Import,
  /** User intends to connect hardware wallet */
  ConnectHW,
  /** User intends to import Secret Recovery Phrase */
  ImportSrp,
}
