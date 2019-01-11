/**
 * Error responses are sent when an error (e.g. unauthorized, bad request, ...)
 * occurred.
 */
export default interface GenericError {
  /**
   * Name is the error name.
   */
  error: string;

  /**
   * Code represents the error status code (404, 403, 401, ...).
   */
  error_code?: number;

  /**
   * Debug contains debug information. This is usually not available and has to
   * be enabled.
   */
  error_debug?: string;

  /**
   * Hint contains further information on the nature of the error.
   */
  error_hint?: string;
}
