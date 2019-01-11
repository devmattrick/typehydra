import OAuth2Client from "./OAuth2Client";
import OpenIDConnectContext from "./OpenIDConnectContext";

/**
 *
 */
export default interface ConsentRequest {
  /**
   * ACR represents the Authentication AuthorizationContext Class Reference
   * value for this authentication session. You can use it to express that, for
   * example, a user authenticated using two factor authentication.
   */
  acr?: string;

  /**
   * Challenge is the identifier (\"authorization challenge\") of the consent
   * authorization request. It is used to identify the session.
   */
  challenge?: string;

  /**
   *
   */
  client?: OAuth2Client;

  /**
   * LoginChallenge is the login challenge this consent challenge belongs to. It
   * can be used to associate a login and consent request in the login & consent
   * app.
   */
  loginChallenge?: string;

  /**
   * LoginSessionID is the authentication session ID. It is set if the browser
   * had a valid authentication session at ORY Hydra during the login flow. It
   * can be used to associate consecutive login requests by a certain user.
   */
  loginSessionId?: string;

  /**
   *
   */
  oidcContext?: OpenIDConnectContext;

  /**
   * RequestURL is the original OAuth 2.0 Authorization URL requested by the
   * OAuth 2.0 client. It is the URL which initiates the OAuth 2.0 Authorization
   * Code or OAuth 2.0 Implicit flow. This URL is typically not needed, but
   * might come in handy if you want to deal with additional request parameters.
   */
  requestUrl?: string;

  /**
   * RequestedScope contains the access token audience as requested by the OAuth
   * 2.0 Client.
   */
  requestedAccessTokenAudience?: string[];

  /**
   * RequestedScope contains the OAuth 2.0 Scope requested by the OAuth 2.0
   * Client.
   */
  requestedScope?: string[];

  /**
   * Skip, if true, implies that the client has requested the same scopes from
   * the same user previously. If true, you must not ask the user to grant the
   * requested scopes. You must however either allow or deny the consent request
   * using the usual API call.
   */
  skip?: boolean;

  /**
   * Subject is the user ID of the end-user that authenticated. Now, that end
   * user needs to grant or deny the scope requested by the OAuth 2.0 client.
   */
  subject?: string;

}
