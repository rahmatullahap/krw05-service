import { where, Sequelize, Op } from 'sequelize';
import { UserModel } from '../model';
import { SearchUserQueryArgs } from '.';

/**
 * Query for get users
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @returns
 */
export async function searchUserQuery(req, res) {
  const args = req.body as SearchUserQueryArgs;
  const data = await UserModel.findAndCountAll({
    where: {
      [Op.or]: [
        {
          nama: where(
            Sequelize.fn('LOWER', Sequelize.col('nama')),
            'LIKE',
            `%${(args?.keyword || '').toLowerCase()}%`
          )
        }
      ]
    },
    order: [['nama', 'ASC']],
    limit: args?.limit || 10,
    offset: args?.skip || 0
  });

  const ret = {
    results: data?.rows?.map((r) => r.toJSON()),
    count: data?.count
  };

  res.json({
    message: 'success',
    data: ret
  });
}

export async function searchUserByIdQuery(req, res) {
  const id = req.params.id;
  try {

    const user = await UserModel.findOne({
      where: {
        userid: id
      }
    });
    if (!user) {
      throw Error(`user with id ${id} not found`);
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
