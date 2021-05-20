import { where, Sequelize, Op } from 'sequelize';
import { MasukModel } from '../model';
import { SearchMasukQueryArgs } from '.';
import { getContextFromAuth } from '../../middleware/access';

/**
 * Query for get masuks
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @returns
 */
export async function searchMasukQuery(req, res) {
  const ctx = getContextFromAuth(req.headers.authorization);
  const args = req.body as SearchMasukQueryArgs;
  const data = await MasukModel.findAndCountAll({
    where: {
      [Op.and]: [
        {
          jenismasuk: where(
            Sequelize.fn('LOWER', Sequelize.col('jenismasuk')),
            'LIKE',
            `%${(args?.keyword || '').toLowerCase()}%`
          )
        },
        {
          unitid: {
            [Op.eq]: ctx.unitid
          }
        }
      ]
    },
    order: [['jenismasuk', 'ASC']],
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

export async function searchMasukByIdQuery(req, res) {
  const id = req.params.id;
  try {
    const masuk = await MasukModel.findOne({
      where: {
        masukid: id
      }
    });
    if (!masuk) {
      throw Error(`masuk with id ${id} not found`);
    }

    res.json({
      message: 'success',
      data: masuk
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    });
  }
}
