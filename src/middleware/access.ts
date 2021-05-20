import * as jwt from 'jsonwebtoken';
import { UserContext } from '../authentication/user-context';
import { config } from '../config';
import bcrypt from 'bcrypt';
import { createNodeLogger } from '../connectors/logger.node';

const { app, log } = config;

const logger = createNodeLogger(log.level);

export interface CredentialData {
  hash: string;
  salt: string;
}

/**
 * get context from authorization
 */
export function getContextFromAuth(authHeader: string): UserContext {
  if (!authHeader) {
    throw new Error('authorization header not found!');
  }
  const user_token = authHeader.replace(/Bearer/gim, '').trim();
  if (!user_token) {
    throw new Error('token not found!');
  }

  let ctx: UserContext = null;

  try {
    const ver = jwt.verify(user_token, app.secret);
    ctx = {
      userid: ver['userid'],
      nama: ver['nama'],
      hakakses: ver['hakakses']
    };
  } catch (err) {
    logger.error(err);
    throw err;
  }
  return ctx;
}

/**
 * create 2 pair of hash and salt derived from password key
 * using secure argon2 kdf
 * @param password - password to hash
 */
export async function createCredential(
  password: string
): Promise<CredentialData> {
  const salt = bcrypt.genSaltSync(16);
  const hash = bcrypt.hashSync(password, salt);
  return {
    salt: salt.toString(),
    hash
  };
}

/**
 * Verify Password
 *
 * @export
 * @param {string} password
 * @param {string} hash
 * @return {*}  {Promise<Boolean>}
 */
export async function verifiyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const verify = bcrypt.compareSync(password, hash);
  return verify;
}
