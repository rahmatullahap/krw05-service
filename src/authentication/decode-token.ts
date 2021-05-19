import { verify } from 'jsonwebtoken';
import { UserContext } from './user-context';
import { config } from '../config';
const { app } = config;

/**
 * Decode token and save the payload as user context
 *
 * @export
 * @param {string} token token
 * @returns {UserContext} token payload as user context
 */
export function decodeToken(token: string): UserContext {
  const payload: any = verify(token, app.providerSecret);
  if (!payload) {
    throw new Error('Invalid token');
  }
  if (!payload.account_id) {
    throw new Error('Invalid token');
  }
  return {
    userid: payload.userid,
    nama: payload.nama,
    hakakses: payload.hakakses
  };
}
