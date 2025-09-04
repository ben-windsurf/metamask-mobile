/**
 * Configuration interface for OAuth authentication settings.
 * Defines the structure for OAuth configuration objects used across different build environments.
 */
interface OAUTH_CONFIG_TYPE {
  /** URL of the authentication server */
  AUTH_SERVER_URL: string;
  /** Web3Auth network identifier */
  WEB3AUTH_NETWORK: string;

  /** Google grouped authentication connection ID */
  GOOGLE_GROUPED_AUTH_CONNECTION_ID: string;
  /** Apple grouped authentication connection ID */
  APPLE_GROUPED_AUTH_CONNECTION_ID: string;
  /** Android-specific Google authentication connection ID */
  ANDROID_GOOGLE_AUTH_CONNECTION_ID: string;
  /** Android-specific Apple authentication connection ID */
  ANDROID_APPLE_AUTH_CONNECTION_ID: string;
  /** iOS-specific Google authentication connection ID */
  IOS_GOOGLE_AUTH_CONNECTION_ID: string;
  /** iOS-specific Apple authentication connection ID */
  IOS_APPLE_AUTH_CONNECTION_ID: string;
}

/**
 * Enumeration of available build types for OAuth configuration.
 * Each build type corresponds to a different deployment environment.
 */
enum BUILD_TYPE {
  /** Development environment */
  development = 'development',
  /** Main production environment */
  main_prod = 'main_prod',
  /** Main user acceptance testing environment */
  main_uat = 'main_uat',
  /** Main development environment */
  main_dev = 'main_dev',
  /** Flask production environment */
  flask_prod = 'flask_prod',
  /** Flask user acceptance testing environment */
  flask_uat = 'flask_uat',
  /** Flask development environment */
  flask_dev = 'flask_dev',
}

/**
 * OAuth configuration mapping for different build environments.
 * Contains authentication server URLs, Web3Auth network settings, and platform-specific connection IDs
 * for each supported build type.
 *
 * @example
 * ```typescript
 * const config = OAUTH_CONFIG[BUILD_TYPE.development];
 * const authUrl = config.AUTH_SERVER_URL;
 * ```
 */
export const OAUTH_CONFIG: Record<BUILD_TYPE, OAUTH_CONFIG_TYPE> = {
  development: {
    GOOGLE_GROUPED_AUTH_CONNECTION_ID: 'mm-seedless-onboarding',
    APPLE_GROUPED_AUTH_CONNECTION_ID: 'mm-seedless-onboarding',
    AUTH_SERVER_URL: 'https://api-develop-torus-byoa.web3auth.io',
    WEB3AUTH_NETWORK: 'sapphire_devnet',

    ANDROID_GOOGLE_AUTH_CONNECTION_ID: 'byoa-server',
    ANDROID_APPLE_AUTH_CONNECTION_ID: 'byoa-server',
    IOS_GOOGLE_AUTH_CONNECTION_ID: 'byoa-server',
    IOS_APPLE_AUTH_CONNECTION_ID: 'byoa-server',
  },
  main_prod: {
    GOOGLE_GROUPED_AUTH_CONNECTION_ID: 'mm-google-main',
    APPLE_GROUPED_AUTH_CONNECTION_ID: 'mm-apple-main',
    AUTH_SERVER_URL: 'https://auth-service.api.cx.metamask.io',
    WEB3AUTH_NETWORK: 'sapphire_mainnet',

    ANDROID_GOOGLE_AUTH_CONNECTION_ID: 'mm-google-main-android',
    ANDROID_APPLE_AUTH_CONNECTION_ID: 'mm-apple-main-common',
    IOS_GOOGLE_AUTH_CONNECTION_ID: 'mm-google-main-ios',
    IOS_APPLE_AUTH_CONNECTION_ID: 'mm-apple-main-common',
  },
  main_uat: {
    GOOGLE_GROUPED_AUTH_CONNECTION_ID: 'mm-google-uat',
    APPLE_GROUPED_AUTH_CONNECTION_ID: 'mm-apple-uat',
    AUTH_SERVER_URL: 'https://auth-service.uat-api.cx.metamask.io',
    WEB3AUTH_NETWORK: 'sapphire_mainnet',

    ANDROID_GOOGLE_AUTH_CONNECTION_ID: 'mm-google-uat-android',
    ANDROID_APPLE_AUTH_CONNECTION_ID: 'mm-apple-uat-common',
    IOS_GOOGLE_AUTH_CONNECTION_ID: 'mm-google-uat-ios',
    IOS_APPLE_AUTH_CONNECTION_ID: 'mm-apple-uat-common',
  },
  main_dev: {
    GOOGLE_GROUPED_AUTH_CONNECTION_ID: 'mm-google-dev',
    APPLE_GROUPED_AUTH_CONNECTION_ID: 'mm-apple-dev',
    AUTH_SERVER_URL: 'https://auth-service.dev-api.cx.metamask.io',
    WEB3AUTH_NETWORK: 'sapphire_devnet',

    ANDROID_GOOGLE_AUTH_CONNECTION_ID: 'mm-google-dev-android',
    ANDROID_APPLE_AUTH_CONNECTION_ID: 'mm-apple-dev-common',
    IOS_GOOGLE_AUTH_CONNECTION_ID: 'mm-google-dev-ios',
    IOS_APPLE_AUTH_CONNECTION_ID: 'mm-apple-dev-common',
  },
  flask_prod: {
    GOOGLE_GROUPED_AUTH_CONNECTION_ID: 'mm-google-flask-main',
    APPLE_GROUPED_AUTH_CONNECTION_ID: 'mm-apple-flask-main',
    AUTH_SERVER_URL: 'https://auth-service.api.cx.metamask.io',
    WEB3AUTH_NETWORK: 'sapphire_mainnet',

    ANDROID_GOOGLE_AUTH_CONNECTION_ID: 'mm-google-flask-main-android',
    ANDROID_APPLE_AUTH_CONNECTION_ID: 'mm-apple-flask-main-common',
    IOS_GOOGLE_AUTH_CONNECTION_ID: 'mm-google-flask-main-ios',
    IOS_APPLE_AUTH_CONNECTION_ID: 'mm-apple-flask-main-common',
  },
  flask_uat: {
    GOOGLE_GROUPED_AUTH_CONNECTION_ID: 'mm-google-flask-uat',
    APPLE_GROUPED_AUTH_CONNECTION_ID: 'mm-apple-flask-uat',
    AUTH_SERVER_URL: 'https://auth-service.api.cx.metamask.io',
    WEB3AUTH_NETWORK: 'sapphire_mainnet',

    ANDROID_GOOGLE_AUTH_CONNECTION_ID: 'mm-google-flask-uat-android',
    ANDROID_APPLE_AUTH_CONNECTION_ID: 'mm-apple-flask-uat-common',
    IOS_GOOGLE_AUTH_CONNECTION_ID: 'mm-google-flask-uat-ios',
    IOS_APPLE_AUTH_CONNECTION_ID: 'mm-apple-flask-uat-common',
  },
  flask_dev: {
    GOOGLE_GROUPED_AUTH_CONNECTION_ID: 'mm-google-flask-dev',
    APPLE_GROUPED_AUTH_CONNECTION_ID: 'mm-apple-flask-dev',
    AUTH_SERVER_URL: 'https://auth-service.dev-api.cx.metamask.io',
    WEB3AUTH_NETWORK: 'sapphire_devnet',

    ANDROID_GOOGLE_AUTH_CONNECTION_ID: 'mm-google-flask-dev-android',
    ANDROID_APPLE_AUTH_CONNECTION_ID: 'mm-apple-flask-dev-common',
    IOS_GOOGLE_AUTH_CONNECTION_ID: 'mm-google-flask-dev-ios',
    IOS_APPLE_AUTH_CONNECTION_ID: 'mm-apple-flask-dev-common',
  },
};
