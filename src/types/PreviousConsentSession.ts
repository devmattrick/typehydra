import ConsentRequest from "./ConsentRequest";
import ConsentRequestSession from "./ConsentRequestSession";

/**
 * The response used to return handled consent requests same as
 * HandledAuthenticationRequest, just with consent_request exposed as JSON
 */
export default interface PreviousConsentSession {
  /**
   *
   */
  consent_request?: ConsentRequest;

  /**
   * GrantedAudience sets the audience the user authorized the client to use.
   * Should be a subset of `requested_access_token_audience`.
   */
  grant_access_token_audience?: string[];

  /**
   * GrantScope sets the scope the user authorized the client to use. Should be
   * a subset of `requested_scope`
   */
  grant_scope?: string[];

  /**
   * Remember, if set to true, tells ORY Hydra to remember this consent
   * authorization and reuse it if the same client asks the same user for the
   * same, or a subset of, scope.
   */
  remember?: boolean;

  /**
   * RememberFor sets how long the consent authorization should be remembered
   * for in seconds. If set to `0`, the authorization will be remembered
   * indefinitely.
   */
  remember_for?: number;

  /**
   *
   */
  session?: ConsentRequestSession;
}
