import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { GetStartedSelectors } from '../../selectors/Ramps/GetStarted.selectors';

/**
 * Page object model for the Buy Get Started view in the Ramps flow.
 * Provides methods to interact with the get started screen for purchasing crypto.
 */
class BuyGetStartedView {
  /**
   * Gets the get started button element.
   * @returns The get started button DetoxElement
   */
  get getStartedButton(): DetoxElement {
    return Matchers.getElementByText(GetStartedSelectors.GET_STARTED);
  }

  /**
   * Taps the get started button to proceed with the buy flow.
   * @returns Promise that resolves when the button is tapped
   */
  async tapGetStartedButton(): Promise<void> {
    await Gestures.waitAndTap(this.getStartedButton, {
      elemDescription: 'Get Started Button in Buy Get Started View',
    });
  }
}

export default new BuyGetStartedView();
