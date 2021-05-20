import { where, Sequelize, Op } from 'sequelize';
import { GroupMasukModel } from '../model';
import { SearchGroupMasukQueryArgs } from '.';

/**
 * Query for get groupmasuks
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @param {any} ctx current context
 * @returns
 */
export async function searchGroupMasukQuery(req, res) {
  const args = req.body as SearchGroupMasukQueryArgs;
  const data = await GroupMasukModel.findAndCountAll({
    where: {
      [Op.or]: [
        {
          groupmasuk: where(
            Sequelize.fn('LOWER', Sequelize.col('groupmasuk')),
            'LIKE',
            `%${(args?.keyword || '').toLowerCase()}%`
          )
        }
      ]
    },
    order: [['id', 'ASC']],
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

export async function searchGroupMasukByIdQuery(req, res) {
  const id = req.params.id;
  try {
    const groupmasuk = await GroupMasukModel.findOne({
      where: {
        id
      }
    });
    if (!groupmasuk) {
      throw Error(`groupmasuk with id ${id} not found`);
    }

    res.json({
      message: 'success',
      data: groupmasuk
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    });
  }
}
