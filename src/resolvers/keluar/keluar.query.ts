import { where, Sequelize, Op } from 'sequelize';
import { KeluarModel } from '../model';
import { SearchKeluarQueryArgs } from '.';

/**
 * Query for get keluars
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @param {any} ctx current context
 * @returns
 */
export async function searchKeluarQuery(req, res) {
  const args = req.body as SearchKeluarQueryArgs;
  const data = await KeluarModel.findAndCountAll({
    where: {
      [Op.or]: [
        {
          jeniskeluar: where(
            Sequelize.fn('LOWER', Sequelize.col('jeniskeluar')),
            'LIKE',
            `%${(args?.keyword || '').toLowerCase()}%`
          )
        }
      ]
    },
    order: [['keluarid', 'ASC']],
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

export async function searchKeluarByIdQuery(req, res) {
  const id = req.params.id;
  try {

    const keluar = await KeluarModel.findOne({
      where: {
        keluarid: id
      }
    });
    if (!keluar) {
      throw Error(`keluar with id ${id} not found`);
    }

    res.json({
      message: 'success',
      data: keluar
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    });
  }
}
