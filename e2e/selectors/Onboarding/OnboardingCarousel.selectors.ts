import enContent from '../../../locales/languages/en.json';

/**
 * Selector IDs for onboarding carousel screen elements.
 * Contains test automation identifiers for various UI components in the onboarding flow.
 */
export const OnboardingCarouselSelectorIDs = {
  CONTAINER_ID: 'onboarding-carousel-screen',
  GET_STARTED_BUTTON_ID: 'welcome-screen-get-started-button-id',
  CAROUSEL_CONTAINER_ID: 'welcome-screen-carousel-container-id',
  ONE_IMAGE_ID: 'carousel-one-image',
  TWO_IMAGE_ID: 'carousel-two-image',
  THREE_IMAGE_ID: 'carousel-three-image',
  APP_START_TIME_ID: 'app-start-time-id',
};

/**
 * Text content selectors for onboarding carousel screen.
 * Contains localized text strings used to identify UI elements during testing.
 */
export const OnboardingCarouselSelectorText = {
  TITLE_ONE: enContent.onboarding_carousel.title1,
  TITLE_TWO: enContent.onboarding_carousel.title2,
  TITLE_THREE: enContent.onboarding_carousel.title3,
};
