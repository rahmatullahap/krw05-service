import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserContext } from '../authentication/user-context';
import { config } from '../config';
import bcrypt from 'bcrypt';
import { createToken } from '../utils';
import { createNodeLogger } from '../connectors/logger.node';

const { app, log } = config;
const authRouter = Router();

const logger = createNodeLogger(log.level);

/**
 * get user token from http request
 */
function getContextFromAuth(authHeader: string): UserContext {
  if (!authHeader) {
    throw new Error('authorization header not found!');
  }
  const user_token = authHeader.replace(/Bearer/gim, '').trim();
  if (!user_token) {
    throw new Error('token not found!');
  }

  let ctx: UserContext = null;

  try {
    const ver = jwt.verify(user_token, app.providerSecret);
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

authRouter.get('/auth', async function(req, res) {
  try {
    const userContext = getContextFromAuth(req.headers.authorization);
    if (!userContext) {
      throw 'Unauthorized';
    }

    res.json('Hello ' + userContext.nama);
  } catch (error) {
    res.status(401).json({
      message: error?.message || error
    });
  }
});

authRouter.get('/ping', async function(req, res) {
  try {
    res.json('Ping Pong');
  } catch (error) {
    res.json({
      message: error?.message || error
    });
  }
});

authRouter.post('/login', async function(req, res) {
  try {
    let same = false;
    if (req.body && req.body.username === 'admin') {
      same = await bcrypt.compare(
        req.body.password,
        '$2b$12$2HIqHI41bbE/vBkRHqqOPOlj39bLn/H7rPzrIQFcPfJqsSW/T2FOK'
      );
    }
    // generate token if password true
    if (same) {
      const token = createToken(
        {
          account_id: '1'
        },
        app.providerSecret
      );
      res.json({
        message: 'success',
        data: {
          token
        }
      });
    } else {
      res.json({
        message: 'failed',
        error: 'Unauthorized',
        data: []
      });
    }
  } catch (error) {
    let message = error?.message || error;
    res.json({
      message: 'failed',
      error: message,
      data: []
    });
  }
});

export default authRouter;
