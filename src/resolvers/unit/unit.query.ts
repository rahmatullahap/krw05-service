import { where, Sequelize, Op } from 'sequelize';
import { UnitModel } from '../model';
import { SearchUnitQueryArgs } from '.';

/**
 * Query for get units
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @returns
 */
export async function searchUnitQuery(req, res) {
  const args = req.body as SearchUnitQueryArgs;
  const data = await UnitModel.findAndCountAll({
    where: {
      [Op.or]: [
        {
          nama: where(
            Sequelize.fn('LOWER', Sequelize.col('namaunit')),
            'LIKE',
            `%${(args?.keyword || '').toLowerCase()}%`
          )
        }
      ]
    },
    order: [['namaunit', 'ASC']],
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

export async function searchUnitByIdQuery(req, res) {
  const id = req.params.id;
  try {
    const unit = await UnitModel.findOne({
      where: {
        unitid: id
      }
    });
    if (!unit) {
      throw Error(`unit with id ${id} not found`);
    }

    res.json({
      message: 'success',
      data: unit
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    });
  }
}
