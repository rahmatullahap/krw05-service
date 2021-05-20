import { HakAkses, User, UserModel } from '../model';
import { AddUserMutationArgs, UpdateUserMutationArgs } from '.';
import { createCredential } from '../../middleware/access';

/**
 * Mutation for create user class
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @returns
 */
export async function addUserMutation(req, res): Promise<any> {
  const args = req.body as AddUserMutationArgs;
  try {
    // check if user exists
    const user = await UserModel.findOne({
      where: {
        userid: args.userid
      }
    });
    if (user) {
      throw Error(`${args.userid} sudah terdaftar`);
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    });
  }

  const { salt, hash } = await createCredential(args.password);
  const response = await UserModel.create({
    userid: args.userid,
    unitid: args.unitid,
    nama: args.nama,
    password: hash,
    hakakses: args.hakakses || HakAkses.admin,
    salt
  });

  const user = response?.toJSON() as User;
  res.json({
    message: 'success',
    data: {
      unitid: user.unitid,
      nama: user.nama,
      userid: user.userid
    }
  });
}

/**
 * Mutation for delete user class
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @returns
 */
export async function removeUserMutation(req, res): Promise<any> {
  const id = req.params.id;
  try {
    // check if user exists
    const user = await UserModel.findOne({
      where: {
        userid: id
      }
    });
    if (!user) {
      throw Error(`user with id ${id} not found`);
    }

    // remove user
    const remove = await UserModel.destroy({
      where: {
        userid: id
      }
    });
    if (!remove) {
      throw Error(`user with id ${id} remove failed`);
    }

    res.json({
      message: 'success',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    });
  }
}

/**
 * update user
 * @export
 * @param {*} _
 * @param {UserMutationUpdateUserArgs} args
 * @returns {Promise<any>}
 */
export async function updateUserMutation(req, res): Promise<any> {
  const args = req.body as UpdateUserMutationArgs;
  const id = req.params.id;
  try {
    let response = await UserModel.findOne({
      where: {
        userid: id
      }
    });

    if (!response) {
      throw Error(`User with id ${id} not found`);
    }

    if (args.unitid) {
      response.set('unitid', args.unitid);
    }
    if (args.nama) {
      response.set('nama', args.nama);
    }
    if (args.password) {
      response.set('password', args.password);
    }
    if (args.hakakses) {
      response.set('hakakses', args.hakakses);
    }

    response = await response.save();
    const result = response?.toJSON() as User;

    res.json({
      message: 'success',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    });
  }
}
