import { Router } from 'express';
import { getContextFromAuth, verifiyPassword } from '../middleware/access';
import { config } from '../config';
import { createToken } from '../utils';
import { User, UserModel } from './model';

const { app } = config;
const authRouter = Router();

export interface LoginArgs {
  username: string;
  password: string;
}

authRouter.get('/whoami', async function(req, res) {
  try {
    const userContext = getContextFromAuth(req.headers.authorization);
    if (!userContext) {
      throw 'Unauthorized';
    }

    res.json('Your name is ' + userContext.nama);
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
    let userResponse: User = null;
    let passwordVerify = false;
    const args = req.body as LoginArgs;

    try {
      let password = args.password;
      const response = await UserModel.findOne({
        where: {
          userid: args.username
        }
      });

      userResponse = response?.toJSON() as User;

      passwordVerify = userResponse?.password === password;
      if (userResponse?.salt) {
        passwordVerify = await verifiyPassword(
          args.password,
          userResponse?.password
        );
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error.message
      });
    }

    // generate token if password true
    if (passwordVerify) {
      const token = createToken(
        {
          userid: userResponse.userid,
          nama: userResponse.nama,
          hakakses: userResponse.hakakses,
          unitid: userResponse.unitid
        },
        app.secret
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
        error: 'Wrong username or password',
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
