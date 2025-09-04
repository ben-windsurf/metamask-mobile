const mm = 'MetaMask';
const prefix = `@${mm}:`;
const USE_TERMS_VERSION = 'v1.0';

/** Storage key for tracking existing user status */
export const EXISTING_USER = `${prefix}existingUser`;

/** Storage key for user's biometry authentication choice */
export const BIOMETRY_CHOICE = `${prefix}biometryChoice`;

/** Storage key for disabled biometry authentication choice */
export const BIOMETRY_CHOICE_DISABLED = `${prefix}biometryChoiceDisabled`;

/** Storage key for user's passcode authentication choice */
export const PASSCODE_CHOICE = `${prefix}passcodeChoice`;

/** Storage key for disabled passcode authentication */
export const PASSCODE_DISABLED = `${prefix}passcodeDisabled`;

/** Storage key for onboarding wizard completion status */
export const ONBOARDING_WIZARD = `${prefix}onboardingWizard`;

/** Storage key for user's metrics opt-in preference */
export const METRICS_OPT_IN = `${prefix}metricsOptIn`;

/** Storage key for analytics data deletion task identifier */
export const ANALYTICS_DATA_DELETION_TASK_ID = `${prefix}analyticsDataDeletionTaskId`;

/** Storage key for analytics data deletion date */
export const ANALYTICS_DATA_DELETION_DATE = `${prefix}analyticsDataDeletionDate`;

/** Storage key for MetaMetrics deletion regulation identifier */
export const METAMETRICS_DELETION_REGULATION_ID = `${prefix}MetaMetricsDeletionRegulationId`;

/** Storage key for tracking if analytics data has been recorded */
export const ANALYTICS_DATA_RECORDED = `${prefix}analyticsDataRecorded`;

/** Storage key for MetaMetrics user identifier */
export const METAMETRICS_ID = `${prefix}MetaMetricsId`;

/**
 * @deprecated, use {@link METAMETRICS_ID} instead
 * Keeping MIXPANEL_METAMETRICS_ID for backward compatibility
 *
 * TODO remove MIXPANEL_METAMETRICS_ID:
 * - add a migration
 * - remove the legacy id test from {@link MetaMetrics}.#getMetaMetricsId()
 * @see https://github.com/MetaMask/metamask-mobile/issues/8833
 */
export const MIXPANEL_METAMETRICS_ID = `${prefix}MixpanelMetaMetricsId`;

export const WALLETCONNECT_SESSIONS = `${prefix}walletconnectSessions`;
export const LAST_INCOMING_TX_BLOCK_INFO = `${prefix}lastIncomingTxBlockInfo`;

export const PUSH_NOTIFICATIONS_PROMPT_COUNT = `${prefix}pushNotificationsPromptCount`;
export const PUSH_NOTIFICATIONS_PROMPT_TIME = `${prefix}pushNotificationsPromptTime`;

export const LANGUAGE = `${prefix}language`;

export const ENCRYPTION_LIB = `${prefix}encryptionLib`;

export const SEED_PHRASE_HINTS = 'seedphraseHints';

export const TRUE = 'true';

export const AGREED = 'agreed';
export const DENIED = 'denied';
export const EXPLORED = 'explored';
export const ORIGINAL = 'original';

export const DEBUG = `[${mm} DEBUG]:`;

export const LAST_APP_VERSION = `${prefix}LastAppVersion`;
export const CURRENT_APP_VERSION = `${prefix}CurrentAppVersion`;

export const WHATS_NEW_APP_VERSION_SEEN = `${prefix}WhatsNewAppVersionSeen`;

export const REVIEW_EVENT_COUNT = 'reviewEventCount';

export const REVIEW_SHOWN_TIME = 'reviewShownTime';

export const themeAppearanceLight = 'light';

export const USE_TERMS = `${prefix}UserTermsAccepted${USE_TERMS_VERSION}`;

export const SOLANA_FEATURE_MODAL_SHOWN = `${prefix}solanaFeatureModalShownV2`;

export const SOLANA_DISCOVERY_PENDING = `${prefix}solanaDiscoveryPending`;

export const BITCOIN_DISCOVERY_PENDING = `${prefix}bitcoinDiscoveryPending`;

export const RESUBSCRIBE_NOTIFICATIONS_EXPIRY = `${prefix}RESUBSCRIBE_NOTIFICATIONS_EXPIRY`;

export const HAS_USER_TURNED_OFF_ONCE_NOTIFICATIONS = `${prefix}HAS_USER_TURNED_OFF_ONCE_NOTIFICATIONS`;

export const OPTIN_META_METRICS_UI_SEEN = `${prefix}OptinMetaMetricsUISeen`;
