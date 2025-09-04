import { MetaMetrics, MetaMetricsEvents } from '../../core/Analytics';
import { MetricsEventBuilder } from '../../core/Analytics/MetricsEventBuilder';
import { TRUE, USE_TERMS } from '../../constants/storage';
import Routes from '../../constants/navigation/Routes';
import { strings } from '../../../locales/i18n';
import { TermsOfUseModalSelectorsIDs } from '../../../e2e/selectors/Onboarding/TermsOfUseModal.selectors';
import StorageWrapper from '../../store/storage-wrapper';
import termsOfUse from './termsOfUseContent';

/**
 * Interface defining the parameters for Terms of Use modal navigation.
 * @interface TermsOfUseParamsI
 * @property screen - The screen route identifier
 * @property params - Modal configuration parameters
 * @property params.containerTestId - Test ID for the modal container
 * @property params.buttonTestId - Test ID for the accept button
 * @property params.buttonText - Text displayed on the accept button
 * @property params.checkboxText - Text displayed next to the checkbox
 * @property params.headerTitle - Title displayed in the modal header
 * @property params.onAccept - Callback function executed when terms are accepted
 * @property params.footerHelpText - Help text displayed in the modal footer
 * @property params.body - WebView body configuration
 * @property params.body.source - Source type for the WebView content
 * @property params.body.html - HTML content to display in the WebView
 * @property params.onRender - Callback function executed when modal is rendered
 * @property params.isScrollToEndNeeded - Whether scrolling to end is required
 * @property params.scrollEndBottomMargin - Bottom margin for scroll end detection
 */
interface TermsOfUseParamsI {
  screen: string;
  params: {
    containerTestId: string;
    buttonTestId: string;
    buttonText: string;
    checkboxText: string;
    headerTitle: string;
    onAccept: () => Promise<void>;
    footerHelpText: string;
    body: {
      source: 'WebView';
      html: string;
    };
    onRender: () => void;
    isScrollToEndNeeded: boolean;
    scrollEndBottomMargin: number;
  };
}

/**
 * Handles the confirmation of Terms of Use acceptance.
 * Stores the acceptance in local storage and triggers analytics tracking.
 *
 * @param onAccept - Optional callback function to execute after terms are accepted
 */
const onConfirmUseTerms = async (onAccept?: () => void) => {
  await StorageWrapper.setItem(USE_TERMS, TRUE);
  if (onAccept) {
    onAccept();
  }
  MetaMetrics.getInstance().trackEvent(
    MetricsEventBuilder.createEventBuilder(
      MetaMetricsEvents.USER_TERMS_ACCEPTED,
    ).build(),
  );
};

/**
 * Tracks analytics event when Terms of Use modal is displayed to the user.
 * Used for measuring user engagement with the terms of use flow.
 */
const useTermsDisplayed = () => {
  MetaMetrics.getInstance().trackEvent(
    MetricsEventBuilder.createEventBuilder(
      MetaMetricsEvents.USER_TERMS_SHOWN,
    ).build(),
  );
};

/**
 * Navigates to the Terms of Use modal if the user hasn't already accepted them.
 * Checks local storage for previous acceptance and conditionally shows the modal.
 *
 * @param navigate - Navigation function to display the modal
 * @param onAccept - Optional callback function to execute after terms are accepted
 *
 * @example
 * ```typescript
 * await navigateTermsOfUse(navigation.navigate, () => {
 *   console.log('Terms accepted, proceeding with onboarding');
 * });
 * ```
 */
export default async function navigateTermsOfUse(
  navigate: (key: string, params: TermsOfUseParamsI) => void,
  onAccept?: () => void,
) {
  const isUseTermsAccepted = await StorageWrapper.getItem(USE_TERMS);
  if (!isUseTermsAccepted) {
    navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
      screen: Routes.MODAL.MODAL_MANDATORY,
      params: {
        containerTestId: TermsOfUseModalSelectorsIDs.CONTAINER,
        buttonTestId: TermsOfUseModalSelectorsIDs.ACCEPT_BUTTON,
        buttonText: strings('terms_of_use_modal.agree_cta'),
        checkboxText: strings(
          'terms_of_use_modal.terms_of_use_check_description',
        ),
        headerTitle: strings('terms_of_use_modal.title'),
        onAccept: () => onConfirmUseTerms(onAccept),
        footerHelpText: strings('terms_of_use_modal.accept_helper_description'),
        body: {
          source: 'WebView',
          html: termsOfUse,
        },
        onRender: useTermsDisplayed,
        isScrollToEndNeeded: true,
        scrollEndBottomMargin: 50,
      },
    });
  }
}
