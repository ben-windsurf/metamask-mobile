import Matchers from '../../../framework/Matchers';
import Gestures from '../../../framework/Gestures';
import { AutoLockModalSelectorsText } from '../../../selectors/Settings/SecurityAndPrivacy/AutoLockModal.selectors';

/**
 * Page object model for the Auto Lock Modal in Security and Privacy settings.
 * Provides methods to interact with auto lock timing options.
 */
class AutoLockModal {
  /**
   * Gets the auto lock immediate option element.
   * @returns The DetoxElement for the immediate auto lock option
   */
  get autoLockImmediate(): DetoxElement {
    return Matchers.getElementByText(
      AutoLockModalSelectorsText.AUTO_LOCK_IMMEDIATE,
    );
  }

  /**
   * Taps the auto lock immediately option.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapAutoLockImmediately(): Promise<void> {
    await Gestures.waitAndTap(this.autoLockImmediate, {
      elemDescription: 'Auto lock immediate',
    });
  }
}

export default new AutoLockModal();
