import { where, Sequelize, Op } from 'sequelize';
import { TransaksiModel } from '../model';
import { SearchTransaksiQueryArgs } from '.';

/**
 * Query for get transaksis
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @returns
 */
export async function searchTransaksiQuery(req, res) {
  const args = req.body as SearchTransaksiQueryArgs;
  const data = await TransaksiModel.findAndCountAll({
    where: {
      [Op.or]: [
        {
          jenis: where(
            Sequelize.fn('LOWER', Sequelize.col('jenis')),
            'LIKE',
            `%${(args?.keyword || '').toLowerCase()}%`
          )
        },
        {
          uraian: where(
            Sequelize.fn('LOWER', Sequelize.col('uraian')),
            'LIKE',
            `%${(args?.keyword || '').toLowerCase()}%`
          )
        }
      ]
    },
    order: [['tanggal', 'ASC']],
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

export async function searchTransaksiByIdQuery(req, res) {
  const id = req.params.id;
  try {
    const transaksi = await TransaksiModel.findOne({
      where: {
        transaksiid: id
      }
    });
    if (!transaksi) {
      throw Error(`transaksi with id ${id} not found`);
    }

    res.json({
      message: 'success',
      data: transaksi
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    });
  }
}

export async function listPengeluaranQuery(req, res) {
  const args = req.body as SearchTransaksiQueryArgs;
  const data = await TransaksiModel.findAndCountAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            {
              jenis: where(
                Sequelize.fn('LOWER', Sequelize.col('jenis')),
                'LIKE',
                `%${(args?.keyword || '').toLowerCase()}%`
              )
            },
            {
              uraian: where(
                Sequelize.fn('LOWER', Sequelize.col('uraian')),
                'LIKE',
                `%${(args?.keyword || '').toLowerCase()}%`
              )
            }
          ]
        },
        {
          sign: {
            [Op.eq]: '-'
          }
        }
      ]
    },
    order: [['tanggal', 'DESC']],
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

export async function listPemasukanQuery(req, res) {
  const args = req.body as SearchTransaksiQueryArgs;
  const data = await TransaksiModel.findAndCountAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            {
              jenis: where(
                Sequelize.fn('LOWER', Sequelize.col('jenis')),
                'LIKE',
                `%${(args?.keyword || '').toLowerCase()}%`
              )
            },
            {
              uraian: where(
                Sequelize.fn('LOWER', Sequelize.col('uraian')),
                'LIKE',
                `%${(args?.keyword || '').toLowerCase()}%`
              )
            }
          ]
        },
        {
          sign: {
            [Op.eq]: '+'
          }
        }
      ]
    },
    order: [['tanggal', 'DESC']],
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
