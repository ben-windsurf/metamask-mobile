import {
  ActivitiesViewSelectorsIDs,
  ActivitiesViewSelectorsText,
} from '../../selectors/Transactions/ActivitiesView.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Activities View in end-to-end tests.
 * Provides methods to interact with transaction activities and their elements.
 */
class ActivitiesView {
  get title(): DetoxElement {
    return Matchers.getElementByText(ActivitiesViewSelectorsText.TITLE);
  }

  get container(): DetoxElement {
    return Matchers.getElementByID(ActivitiesViewSelectorsIDs.CONTAINER);
  }

  get confirmedLabel(): DetoxElement {
    return Matchers.getElementByText(ActivitiesViewSelectorsText.CONFIRM_TEXT);
  }

  get stakeDepositedLabel(): DetoxElement {
    return Matchers.getElementByText(ActivitiesViewSelectorsText.STAKE_DEPOSIT);
  }

  get stakeMoreDepositedLabel(): DetoxElement {
    return Matchers.getElementByText(
      ActivitiesViewSelectorsText.STAKE_DEPOSIT,
      0,
    );
  }

  get unstakeLabel(): DetoxElement {
    return Matchers.getElementByText(ActivitiesViewSelectorsText.UNSTAKE);
  }

  get stackingClaimLabel(): DetoxElement {
    return Matchers.getElementByText(ActivitiesViewSelectorsText.STAKING_CLAIM);
  }

  /**
   * Gets the transaction status element for a specific row.
   * @param row - The row number of the transaction
   * @returns DetoxElement for the transaction status
   */
  transactionStatus(row: number): DetoxElement {
    return Matchers.getElementByID(`transaction-status-${row}`);
  }

  /**
   * Gets the transaction item element for a specific row.
   * @param row - The row number of the transaction
   * @returns DetoxElement for the transaction item
   */
  transactionItem(row: number): DetoxElement {
    return Matchers.getElementByID(`transaction-item-${row}`);
  }

  /**
   * Generates a swap activity label by replacing token placeholders.
   * @param sourceToken - The source token symbol
   * @param destinationToken - The destination token symbol
   * @returns The formatted swap activity label
   */
  generateSwapActivityLabel(
    sourceToken: string,
    destinationToken: string,
  ): string {
    let title = ActivitiesViewSelectorsText.SWAP;
    title = title.replace('{{sourceToken}}', sourceToken);
    title = title.replace('{{destinationToken}}', destinationToken);
    return title;
  }

  /**
   * Generates a bridge activity label by replacing the chain name placeholder.
   * @param destNetwork - The destination network name
   * @returns The formatted bridge activity label
   */
  generateBridgeActivityLabel(destNetwork: string): string {
    let title = ActivitiesViewSelectorsText.BRIDGE;
    title = title.replace('{{chainName}}', destNetwork);
    return title;
  }

  /**
   * Generates an approved token activity label with regex pattern matching.
   * @param sourceToken - The source token symbol
   * @returns The formatted approved token activity label with regex anchors
   */
  generateApprovedTokenActivityLabel(sourceToken: string): string {
    let title = ActivitiesViewSelectorsText.APPROVE;
    title = title.replace('{{sourceToken}}', sourceToken);
    title = title.replace('{{upTo}}', '.*');
    return `^${title}`;
  }

  swapActivityTitle(
    sourceToken: string,
    destinationToken: string,
  ): DetoxElement {
    return Matchers.getElementByText(
      this.generateSwapActivityLabel(sourceToken, destinationToken),
    );
  }

  bridgeActivityTitle(destNetwork: string): DetoxElement {
    return Matchers.getElementByText(
      this.generateBridgeActivityLabel(destNetwork),
    );
  }
  tokenApprovalActivity(sourceToken: string): DetoxElement {
    return Matchers.getElementByText(
      this.generateApprovedTokenActivityLabel(sourceToken),
    );
  }

  async tapOnSwapActivity(
    sourceToken: string,
    destinationToken: string,
  ): Promise<void> {
    const el = this.swapActivityTitle(sourceToken, destinationToken);
    await Gestures.waitAndTap(el);
  }
  async tapConfirmedTransaction(): Promise<void> {
    await Gestures.waitAndTap(this.confirmedLabel);
  }
  async swipeDown(): Promise<void> {
    await Gestures.swipe(this.container, 'down', {
      speed: 'slow',
      percentage: 0.5,
    });
  }
  async tapOnTransactionItem(row: number): Promise<void> {
    await Gestures.waitAndTap(this.transactionItem(row));
  }
}

export default new ActivitiesView();
