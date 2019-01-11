/**
 *
 */
export default interface JSONWebKeySetGeneratorRequest {
  /**
   * The algorithm to be used for creating the key. Supports "RS256", "ES512",
   * "HS512", and "HS256"
   */
  alg: string;

  /**
   * The kid of the key to be created
   */
  kid: string;

  /**
   * The "use" (public key use) parameter identifies the intended use of the
   * public key. The "use" parameter is employed to indicate whether a public
   * key is used for encrypting data or verifying the signature on data. Valid
   * values are "enc" and "sig".
   */
  use: string;
}
