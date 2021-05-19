import { sign, verify } from 'jsonwebtoken';

/**
 * token information
 *
 * @export
 * @interface TokenClaim
 */
export interface TokenClaim {
  account_id?: string;
}

/**
 * create provider spesific access token
 *
 * @export
 * @returns
 */
export function createToken(payload: TokenClaim, secret: string): string {
  return sign(payload, secret);
}

/**
 * verify and decode access token
 *
 * @export
 * @param {string} token
 * @returns {TokenClaim}
 */
export function verifyToken(token: string, secret: string): TokenClaim {
  return verify(token, secret) as TokenClaim;
}
