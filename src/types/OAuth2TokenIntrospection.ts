/**
 * https://tools.ietf.org/html/rfc7662
 */
export default interface OAuth2TokenIntrospection {
  /**
   * Active is a boolean indicator of whether or not the presented token is
   * currently active.  The specifics of a token's \"active\" state will vary
   * depending on the implementation of the authorization server and the
   * information it keeps about its tokens, but a \"true\" value return for the
   * \"active\" property will generally indicate that a given token has been
   * issued by this authorization server, has not been revoked by the resource
   * owner, and is within its given time window of validity (e.g., after its
   * issuance time and before its expiration time).
   */
  active: boolean;
  /**
   * Audience contains a list of the token's intended audiences.
   */
  aud?: string[];

  /**
   * ClientID is aclient identifier for the OAuth 2.0 client that requested this
   * token.
   */
  client_id?: string;

  /**
   * Expires at is an integer timestamp, measured in the number of seconds since
   * January 1 1970 UTC, indicating when this token will expire.
   */
  exp?: number;

  /**
   * Extra is arbitrary data set by the session.
   */
  ext?: { [key: string]: any; };

  /**
   * Issued at is an integer timestamp, measured in the number of seconds since
   * January 1 1970 UTC, indicating when this token was originally issued.
   */
  iat?: number;

  /**
   * IssuerURL is a string representing the issuer of this token
   */
  iss?: string;

  /**
   * NotBefore is an integer timestamp, measured in the number of seconds since
   * January 1 1970 UTC, indicating when this token is not to be used before.
   */
  nbf?: number;

  /**
   * ObfuscatedSubject is set when the subject identifier algorithm was set to
   * \"pairwise\" during authorization. It is the `sub` value of the ID Token
   * that was issued.
   */
  obfuscated_subject?: string;

  /**
   * Scope is a JSON string containing a space-separated list of scopes
   * associated with this token.
   */
  scope?: string;

  /**
   * Subject of the token, as defined in JWT [RFC7519]. Usually a
   * machine-readable identifier of the resource owner who authorized this
   * token.
   */
  sub?: string;

  /**
   * TokenType is the introspected token's type, for example `access_token` or
   * `refresh_token`.
   */
  token_type?: string;

  /**
   * Username is a human-readable identifier for the resource owner who
   * authorized this token.
   */
  username?: string;
}
