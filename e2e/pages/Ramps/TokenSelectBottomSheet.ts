import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { selectTokenSelectors } from '../../selectors/Ramps/SelectToken.selectors';

/**
 * Page object for the Token Select Bottom Sheet in the Ramps flow.
 * Provides methods to interact with token selection UI elements.
 */
class TokenSelectBottomSheet {
  /**
   * Gets the token search input element.
   * @returns The DetoxElement for the token search input field
   */
  get tokenSearchInput(): DetoxElement {
    return Matchers.getElementByID(
      selectTokenSelectors.TOKEN_SELECT_MODAL_SEARCH_INPUT,
    );
  }

  /**
   * Searches for and taps a token by name in the token select bottom sheet.
   * @param token - The name of the token to search for and select
   */
  async tapTokenByName(token: string) {
    await Gestures.typeText(this.tokenSearchInput, token, {
      elemDescription: 'Token Search Input',
      hideKeyboard: true,
    });
    const tokenName = Matchers.getElementByText(token, 1);
    await Gestures.waitAndTap(tokenName, {
      elemDescription: `Token "${token}" in Token Select Bottom Sheet`,
    });
  }
}

export default new TokenSelectBottomSheet();
