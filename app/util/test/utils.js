/**
 * Flushes all pending promises by scheduling a callback on the next iteration of the event loop
 * Useful for testing async operations by ensuring all promises resolve before continuing
 * @returns {Promise<void>} A promise that resolves after all pending promises
 */
export const flushPromises = () => new Promise(setImmediate);

/**
 * Default port number for the fixtures server used in E2E testing
 */
export const FIXTURE_SERVER_PORT = 12345;

/**
 * E2E test configuration object required in app
 * Contains runtime configuration for testing environments
 */
export const testConfig = {};

/**
 * SEGMENT TRACK URL for E2E tests - this is not a real URL and is used for testing purposes only
 * Used to mock analytics tracking in test environments
 */
export const E2E_METAMETRICS_TRACK_URL = 'https://metametrics.test/track';

/**
 * Returns true if the build type or environment is QA or if the environment is e2e
 * TODO: For the most part, this is meant for e2e testing. Check if this condition is truly needed for QA or if we can consolidate it to check for E2E environment.
 * @returns {boolean} True if running in QA or E2E environment
 */
export const isQa =
  process.env.METAMASK_BUILD_TYPE === 'qa' ||
  process.env.METAMASK_ENVIRONMENT === 'qa' ||
  process.env.METAMASK_ENVIRONMENT === 'e2e' ||
  process.env.METAMASK_ENVIRONMENT === 'exp';
/**
 * Determines if the current environment is a test environment
 * Returns true for all environments except production, pre-release, beta, rc, and exp
 * TODO: Update this condition once we change E2E builds to use release instead of debug
 * @returns {boolean} True if running in test environment
 */
export const isTest =
  process.env.METAMASK_ENVIRONMENT !== 'production' &&
  process.env.METAMASK_ENVIRONMENT !== 'pre-release' &&
  process.env.METAMASK_ENVIRONMENT !== 'beta' &&
  process.env.METAMASK_ENVIRONMENT !== 'rc' &&
  process.env.METAMASK_ENVIRONMENT !== 'exp';
/**
 * Determines if the current environment is an E2E testing environment
 * @returns {boolean} True if running in E2E test environment
 */
export const isE2E =
  process.env.IS_TEST === 'true' || process.env.METAMASK_ENVIRONMENT === 'e2e';
/**
 * Flag to enable API call logging based on environment variable
 * @returns {boolean} True if API call logging is enabled
 */
export const enableApiCallLogs = process.env.LOG_API_CALLS === 'true';
/**
 * Gets the fixtures server port from test configuration or returns the default port
 * @returns {number} The port number for the fixtures server
 */
export const getFixturesServerPortInApp = () =>
  testConfig.fixtureServerPort ?? FIXTURE_SERVER_PORT;
