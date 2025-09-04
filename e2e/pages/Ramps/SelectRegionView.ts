import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { SelectRegionSelectors } from '../../selectors/Ramps/SelectRegion.selectors';

/**
 * Page object for the Select Region view in the Ramps flow.
 * Provides methods to interact with region selection UI elements.
 */
class SelectRegionView {
  /**
   * Gets the continue button element.
   * @returns The continue button DetoxElement
   */
  get continueButton(): DetoxElement {
    return Matchers.getElementByText(SelectRegionSelectors.CONTINUE_BUTTON);
  }

  /**
   * Gets the region search input element.
   * @returns The region search input DetoxElement
   */
  get regionSearchInput(): DetoxElement {
    return Matchers.getElementByID(
      SelectRegionSelectors.REGION_MODAL_SEARCH_INPUT,
    );
  }

  /**
   * Searches for and taps a specific region option.
   * @param region - The name of the region to select
   * @returns Promise that resolves when the region is selected
   */
  async tapRegionOption(region: string): Promise<void> {
    await Gestures.typeText(this.regionSearchInput, region, {
      elemDescription: 'Region Search Input',
      hideKeyboard: true,
    });
    const regionName = Matchers.getElementByText(region, 1);
    await Gestures.waitAndTap(regionName, {
      elemDescription: `Region "${region}" in Select Region View`,
    });
  }

  /**
   * Taps the continue button to proceed to the next step.
   * @returns Promise that resolves when the continue button is tapped
   */
  async tapContinueButton(): Promise<void> {
    await Gestures.waitAndTap(this.continueButton, {
      elemDescription: 'Continue Button in Select Region View',
    });
  }
}

export default new SelectRegionView();
