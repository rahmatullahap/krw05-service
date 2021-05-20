import * as jwt from 'jsonwebtoken';
import { UserContext } from '../authentication/user-context';
import { config } from '../config';
import bcrypt from 'bcrypt';
import { createNodeLogger } from '../connectors/logger.node';
import { HakAkses } from '../resolvers/model';

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
      hakakses: ver['hakakses'],
      unitid: ver['unitid']
    };
  } catch (err) {
    logger.error(err);
    throw err;
  }
  return ctx;
}

export function middleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    verifyToken(authHeader);
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error
    });
  }
  next();
}

export function middlewareAdministrator(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const ctx = getContextFromAuth(authHeader);
    if (ctx.hakakses !== HakAkses.administrator) {
      throw 'You are not admin';
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error
    });
  }
  next();
}

/**
 * get context from authorization
 */
export function verifyToken(authHeader) {
  if (!authHeader) {
    throw 'authorization header not found!';
  }
  const user_token = authHeader.replace(/Bearer/gim, '').trim();
  if (!user_token) {
    throw 'token not found';
  }

  let ctx: UserContext = null;

  try {
    const ver = jwt.verify(user_token, app.secret);
    ctx = {
      userid: ver['userid'],
      nama: ver['nama'],
      hakakses: ver['hakakses'],
      unitid: ver['unitid']
    };
  } catch (error) {
    throw error.message;
  }

  if (!ctx) {
    throw 'unauthorized';
  }

  return true;
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
