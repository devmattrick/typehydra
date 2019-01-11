/**
 *
 */
export default interface FlushInactiveOAuth2TokensRequest {
  /**
   * NotAfter sets after which point tokens should not be flushed. This is
   * useful when you want to keep a history of recently issued tokens for
   * auditing.
   */
  notAfter?: Date;
}
