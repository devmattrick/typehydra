/**
 * The token response
 */
export default interface OAuth2TokenResponse {
  /**
   * The access token issued by the authorization server.
   */
  accessToken?: string;

  /**
   * The lifetime in seconds of the access token.  For example, the value
   * \"3600\" denotes that the access token will expire in one hour from the
   * time the response was generated.
   */
  expiresIn?: number;

  /**
   * To retrieve a refresh token request the id_token scope.
   */
  idToken?: number;

  /**
   * The refresh token, which can be used to obtain new access tokens. To
   * retrieve it add the scope \"offline\" to your access token request.
   */
  refreshToken?: string;

  /**
   * The scope of the access token
   */
  scope?: number;

  /**
   * The type of the token issued
   */
  tokenType?: string;
}
