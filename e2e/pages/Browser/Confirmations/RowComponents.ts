import { ConfirmationRowComponentIDs } from '../../../selectors/Confirmation/ConfirmationView.selectors';
import Matchers from '../../../framework/Matchers';

/**
 * Page object class for accessing confirmation row components in the browser.
 * Provides getter methods to retrieve Detox elements for various confirmation UI components.
 */
class RowComponents {
  /**
   * Gets the account network confirmation row element.
   * @returns The Detox element for the account network row
   */
  get AccountNetwork(): DetoxElement {
    return Matchers.getElementByID(ConfirmationRowComponentIDs.ACCOUNT_NETWORK);
  }

  /**
   * Gets the advanced details confirmation row element.
   * @returns The Detox element for the advanced details row
   */
  get AdvancedDetails(): DetoxElement {
    return Matchers.getElementByID(
      ConfirmationRowComponentIDs.ADVANCED_DETAILS,
    );
  }

  /**
   * Gets the from/to addresses confirmation row element.
   * @returns The Detox element for the from/to addresses row
   */
  get FromTo(): DetoxElement {
    return Matchers.getElementByID(ConfirmationRowComponentIDs.FROM_TO);
  }

  /**
   * Gets the gas fees details confirmation row element.
   * @returns The Detox element for the gas fees details row
   */
  get GasFeesDetails(): DetoxElement {
    return Matchers.getElementByID(
      ConfirmationRowComponentIDs.GAS_FEES_DETAILS,
    );
  }

  /**
   * Gets the message confirmation row element.
   * @returns The Detox element for the message row
   */
  get Message(): DetoxElement {
    return Matchers.getElementByID(ConfirmationRowComponentIDs.MESSAGE);
  }

  /**
   * Gets the origin information confirmation row element.
   * @returns The Detox element for the origin info row
   */
  get OriginInfo(): DetoxElement {
    return Matchers.getElementByID(ConfirmationRowComponentIDs.ORIGIN_INFO);
  }

  /**
   * Gets the simulation details confirmation row element.
   * @returns The Detox element for the simulation details row
   */
  get SimulationDetails(): DetoxElement {
    return Matchers.getElementByID(
      ConfirmationRowComponentIDs.SIMULATION_DETAILS,
    );
  }

  get SiweSigningAccountInfo(): DetoxElement {
    return Matchers.getElementByID(
      ConfirmationRowComponentIDs.SIWE_SIGNING_ACCOUNT_INFO,
    );
  }

  get TokenHero(): DetoxElement {
    return Matchers.getElementByID(ConfirmationRowComponentIDs.TOKEN_HERO);
  }

  get ApproveRow(): DetoxElement {
    return Matchers.getElementByID(ConfirmationRowComponentIDs.APPROVE_ROW);
  }
}

export default new RowComponents();
