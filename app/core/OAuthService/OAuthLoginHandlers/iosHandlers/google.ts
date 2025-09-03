import {
  LoginHandlerCodeResult,
  AuthConnection,
  AuthRequestParams,
  HandleFlowParams,
} from '../../OAuthInterface';
import {
  AuthRequest,
  CodeChallengeMethod,
  ResponseType,
} from 'expo-auth-session';
import { BaseHandlerOptions, BaseLoginHandler } from '../baseHandler';
import { OAuthErrorType, OAuthError } from '../../error';

/**
 * IosGoogleLoginHandlerParams is the params for the Google login handler
 */
export interface IosGoogleLoginHandlerParams extends BaseHandlerOptions {
  clientId: string;
  redirectUri: string;
}

/**
 * IosGoogleLoginHandler handles Google OAuth authentication flow for iOS devices in MetaMask Mobile.
 * Extends BaseLoginHandler to provide Google-specific OAuth implementation using expo-auth-session.
 * Manages the complete OAuth flow including authorization request, token exchange, and error handling.
 */
export class IosGoogleLoginHandler extends BaseLoginHandler {
  public readonly OAUTH_SERVER_URL =
    'https://accounts.google.com/o/oauth2/v2/auth';

  readonly #scope = ['email', 'profile', 'openid'];

  protected clientId: string;
  protected redirectUri: string;

  get authConnection() {
    return AuthConnection.Google;
  }

  get scope() {
    return this.#scope;
  }

  get authServerPath() {
    return 'api/v1/oauth/token';
  }

  /**
   * IosGoogleLoginHandler constructor.
   *
   * @param params.clientId - The iOS clientId for the Google login.
   * @param params.redirectUri - The iOS redirectUri for the Google login.
   */
  constructor(params: IosGoogleLoginHandlerParams) {
    super({
      authServerUrl: params.authServerUrl,
      clientId: params.clientId,
      web3AuthNetwork: params.web3AuthNetwork,
    });
    this.clientId = params.clientId;
    this.redirectUri = params.redirectUri;
  }

  /**
   * This method is used to login with Google via expo-auth-session.
   *
   * @returns LoginHandlerCodeResult
   */
  async login(): Promise<LoginHandlerCodeResult> {
    const state = JSON.stringify({
      nonce: this.nonce,
    });
    const authRequest = new AuthRequest({
      clientId: this.clientId,
      redirectUri: this.redirectUri,
      scopes: this.#scope,
      responseType: ResponseType.Code,
      codeChallengeMethod: CodeChallengeMethod.S256,
      usePKCE: true,
      state,
    });
    const result = await authRequest.promptAsync({
      authorizationEndpoint: this.OAUTH_SERVER_URL,
    });

    if (result.type === 'success') {
      return {
        authConnection: this.authConnection,
        code: result.params.code, // result.params.idToken
        clientId: this.clientId,
        redirectUri: this.redirectUri,
        codeVerifier: authRequest.codeVerifier,
      };
    }
    if (result.type === 'cancel') {
      throw new OAuthError(
        'handleIosGoogleLogin: User cancelled the login process',
        OAuthErrorType.UserCancelled,
      );
    }
    if (result.type === 'dismiss') {
      throw new OAuthError(
        'handleIosGoogleLogin: User dismissed the login process',
        OAuthErrorType.UserDismissed,
      );
    }
    throw new OAuthError(
      'handleIosGoogleLogin: Unknown error',
      OAuthErrorType.GoogleLoginError,
    );
  }

  /**
   * Transforms OAuth flow parameters into the format required for auth token request.
   * Validates that the required 'code' parameter is present and constructs the request data
   * needed to exchange the authorization code for an access token.
   *
   * @param params - The OAuth flow parameters containing authorization code and related data
   * @returns AuthRequestParams object formatted for token exchange request
   * @throws OAuthError when required 'code' parameter is missing from params
   */
  getAuthTokenRequestData(params: HandleFlowParams): AuthRequestParams {
    if (!('code' in params)) {
      throw new OAuthError(
        'handleIosGoogleLogin: Invalid params',
        OAuthErrorType.InvalidGetAuthTokenParams,
      );
    }
    const { redirectUri, code, clientId, codeVerifier, web3AuthNetwork } =
      params;
    return {
      client_id: clientId,
      redirect_uri: redirectUri,
      code,
      login_provider: this.authConnection,
      network: web3AuthNetwork,
      code_verifier: codeVerifier,
    };
  }
}
