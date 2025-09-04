import { Platform } from 'react-native';
import { AuthConnection } from './OAuthInterface';
import { createLoginHandler } from './OAuthLoginHandlers';

/** API path for revoking OAuth tokens */
const AUTH_SERVER_REVOKE_PATH = '/api/v1/oauth/revoke';
/** API path for refreshing OAuth tokens */
const AUTH_SERVER_TOKEN_PATH = '/api/v1/oauth/token';

/**
 * Handles OAuth token operations including refreshing and revoking tokens.
 * Provides methods to interact with the authentication server for token management.
 */
class AuthTokenHandler {
  /**
   * Refreshes a JWT token using a refresh token.
   *
   * @param params - The parameters for token refresh
   * @param params.connection - The OAuth connection configuration
   * @param params.refreshToken - The refresh token to use for getting new tokens
   * @returns Promise resolving to new token set including ID tokens, access token, and metadata access token
   */
  async refreshJWTToken(params: {
    connection: AuthConnection;
    refreshToken: string;
  }): Promise<{
    idTokens: string[];
    accessToken: string;
    metadataAccessToken: string;
  }> {
    const { connection, refreshToken } = params;
    const loginHandler = createLoginHandler(Platform.OS, connection);

    const requestData = {
      client_id: loginHandler.options.clientId,
      login_provider: connection,
      network: loginHandler.options.web3AuthNetwork,
      refresh_token: refreshToken,
      grant_type: 'refresh_token', // specify refresh token flow
    };

    const response = await fetch(
      `${loginHandler.options.authServerUrl}${AUTH_SERVER_TOKEN_PATH}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      },
    );

    const refreshTokenData = await response.json();
    const idToken = refreshTokenData.id_token;

    return {
      idTokens: [idToken],
      accessToken: refreshTokenData.access_token,
      metadataAccessToken: refreshTokenData.metadata_access_token,
    };
  }

  /**
   * Revokes a refresh token and returns new tokens.
   *
   * @param params - The parameters for token revocation
   * @param params.connection - The OAuth connection configuration
   * @param params.revokeToken - The token to revoke
   * @returns Promise resolving to new refresh and revoke tokens
   */
  async revokeRefreshToken(params: {
    connection: AuthConnection;
    revokeToken: string;
  }) {
    const { connection, revokeToken } = params;
    const loginHandler = createLoginHandler(Platform.OS, connection);

    const requestData = {
      revoke_token: revokeToken,
    };

    const response = await fetch(
      `${loginHandler.options.authServerUrl}${AUTH_SERVER_REVOKE_PATH}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      },
    );

    const responseData = await response.json();
    return {
      newRefreshToken: responseData.refresh_token,
      newRevokeToken: responseData.revoke_token,
    };
  }
}

export default new AuthTokenHandler();
