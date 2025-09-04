/**
 * Authentication types supported by the application for user verification.
 * Used to identify different methods of user authentication and security.
 */
enum AUTHENTICATION_TYPE {
  /** Biometric authentication (fingerprint, face recognition, etc.) */
  BIOMETRIC = 'biometrics',
  /** Device passcode authentication */
  PASSCODE = 'device_passcode',
  /** Remember me functionality for persistent login */
  REMEMBER_ME = 'remember_me',
  /** Password-based authentication */
  PASSWORD = 'password',
  /** Unknown or unspecified authentication type */
  UNKNOWN = 'unknown',
}

export default AUTHENTICATION_TYPE;
