import { where, Sequelize, Op } from 'sequelize';
import { GroupKeluarModel } from '../model';
import { SearchGroupKeluarQueryArgs } from '.';

/**
 * Query for get groupkeluars
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @param {any} ctx current context
 * @returns
 */
export async function searchGroupKeluarQuery(req, res) {
  const args = req.body as SearchGroupKeluarQueryArgs;
  const data = await GroupKeluarModel.findAndCountAll({
    where: {
      [Op.or]: [
        {
          groupkeluar: where(
            Sequelize.fn('LOWER', Sequelize.col('groupkeluar')),
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

  if (args.list) {
    res.json({
      message: 'success',
      data: data?.rows?.map((r) => r.toJSON())
    });
  }

  const ret = {
    results: data?.rows?.map((r) => r.toJSON()),
    count: data?.count
  };

  res.json({
    message: 'success',
    data: ret
  });
}

export async function searchGroupKeluarByIdQuery(req, res) {
  const id = req.params.id;
  try {
    const groupkeluar = await GroupKeluarModel.findOne({
      where: {
        id
      }
    });
    if (!groupkeluar) {
      throw Error(`groupkeluar with id ${id} not found`);
    }

    res.json({
      message: 'success',
      data: groupkeluar
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    });
  }
}
