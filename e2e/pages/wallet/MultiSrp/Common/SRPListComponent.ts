import { SRPListSelectorsIDs } from '../../../../selectors/MultiSRP/SRPList.selectors';
import Matchers from '../../../../framework/Matchers';

/**
 * Component for interacting with SRP (Secret Recovery Phrase) list elements in end-to-end tests.
 * Provides methods to access and interact with SRP list UI elements using Detox framework.
 */
class SRPListComponent {
  /**
   * Gets the SRP list element for test interactions.
   * @returns The Detox element representing the SRP list container
   */
  get srpList(): DetoxElement {
    return Matchers.getElementByID(SRPListSelectorsIDs.SRP_LIST);
  }
}

export default new SRPListComponent();
