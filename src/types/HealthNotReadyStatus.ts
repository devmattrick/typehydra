/**
 *
 */
export default interface HealthNotReadyStatus {
  /**
   * Errors contains a list of errors that caused the not ready status.
   */
  errors?: { [key: string]: string; };
}
