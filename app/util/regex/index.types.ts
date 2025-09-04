/**
 * Interface defining regular expression patterns and utility functions used throughout the application.
 * Provides a centralized collection of regex patterns for validation, formatting, and parsing operations.
 */
export interface RegexTypes {
  /** Function that returns a regex pattern for validating Ethereum amounts with specified decimal places */
  eth: (num: number) => RegExp;
  /** Function that returns a regex pattern for validating USD amounts with specified decimal places */
  usd: (num: number) => RegExp;
  /** Pattern for validating account balance format */
  accountBalance: RegExp;
  /** Pattern for validating activation key format */
  activationKey: RegExp;
  /** Pattern for matching addresses that may contain spaces */
  addressWithSpaces: RegExp;
  /** Pattern for matching black color values */
  colorBlack: RegExp;
  /** Pattern for decimal string migrations */
  decimalStringMigrations: RegExp;
  /** Pattern for validating decimal string format */
  decimalString: RegExp;
  /** Pattern for matching default account identifiers */
  defaultAccount: RegExp;
  /** Pattern for validating ENS (Ethereum Name Service) names */
  ensName: RegExp;
  /** Function to execute a regex pattern against input string and return matches */
  exec: (exp: string, input: string) => RegExpExecArray | null;
  /** Pattern for matching fractional numbers */
  fractions: RegExp;
  /** Pattern for checking if string contains at least one digit */
  hasOneDigit: RegExp;
  /** Pattern for matching hexadecimal prefix (0x) */
  hexPrefix: RegExp;
  /** Pattern for validating integer format */
  integer: RegExp;
  /** Pattern for matching local network identifiers */
  localNetwork: RegExp;
  /** Pattern for extracting name initials */
  nameInitial: RegExp;
  /** Pattern for matching non-numeric characters */
  nonNumber: RegExp;
  /** Pattern for validating numeric format */
  number: RegExp;
  /** Pattern for validating prefixed formatted hexadecimal strings */
  prefixedFormattedHexString: RegExp;
  /** Pattern for identifying private credentials in text */
  privateCredentials: RegExp;
  /** Pattern for matching URL protocols */
  protocol: RegExp;
  /** Pattern for replacing network error messages in Sentry reports */
  replaceNetworkErrorSentry: RegExp;
  /** Pattern for sanitizing URLs */
  sanitizeUrl: RegExp;
  /** Pattern for validating seed phrase format */
  seedPhrase: RegExp;
  /** Pattern for matching URL start patterns */
  startUrl: RegExp;
  /** Pattern for matching trailing slashes in URLs */
  trailingSlash: RegExp;
  /** Pattern for matching trailing zeros in numbers */
  trailingZero: RegExp;
  /** Pattern for validating transaction nonce format */
  transactionNonce: RegExp;
  /** Pattern for converting HTTP URLs to HTTPS */
  urlHttpToHttps: RegExp;
  /** Pattern for validating URL format */
  url: RegExp;
  /** Pattern for validating hexadecimal chain ID format */
  validChainIdHex: RegExp;
  /** Pattern for validating chain ID format */
  validChainId: RegExp;
  /** Pattern for validating wallet address format */
  walletAddress: RegExp;
  /** Pattern for matching whitespace characters */
  whiteSpaces: RegExp;
}
