import { where, Sequelize, Op } from 'sequelize';
import { TransaksiModel } from '../model';
import { SearchTransaksiQueryArgs } from '.';
import { getContextFromAuth } from '../../middleware/access';

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

export async function listTransferQuery(req, res) {
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
          jenisid: {
            [Op.eq]: 'TRANSFER'
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

export async function totalTransaksiQuery(req, res) {
  const ctx = getContextFromAuth(req.headers.authorization);
  const pemasukan = await TransaksiModel.findAll({
    where: {
      [Op.and]: [
        {
          unitid: {
            [Op.eq]: ctx.unitid
          }
        },
        {
          sign: {
            [Op.eq]: '+'
          }
        }
      ]
    },
    attributes: [[Sequelize.fn('sum', Sequelize.col('jumlah')), 'total']],
    group: ['unitid']
  });

  const pengeluaran = await TransaksiModel.findAll({
    where: {
      [Op.and]: [
        {
          unitid: {
            [Op.eq]: ctx.unitid
          }
        },
        {
          sign: {
            [Op.eq]: '-'
          }
        }
      ]
    },
    attributes: [[Sequelize.fn('sum', Sequelize.col('jumlah')), 'total']],
    group: ['unitid']
  });

  const transfer = await TransaksiModel.findAll({
    where: {
      [Op.and]: [
        {
          unitid: {
            [Op.eq]: ctx.unitid
          }
        },
        {
          jenisid: {
            [Op.eq]: 'TRANSFER'
          }
        }
      ]
    },
    attributes: [[Sequelize.fn('sum', Sequelize.col('jumlah')), 'total']],
    group: ['unitid']
  });

  const transferan = await TransaksiModel.findAll({
    where: {
      [Op.and]: [
        {
          unitid: {
            [Op.eq]: ctx.unitid
          }
        },
        {
          jenisid: {
            [Op.eq]: 'TRANSFERAN'
          }
        }
      ]
    },
    attributes: [[Sequelize.fn('sum', Sequelize.col('jumlah')), 'total']],
    group: ['unitid']
  });

  const totalPemasukan =
    pemasukan?.map((r) => r.toJSON()).length > 0
      ? pemasukan?.map((r) => r.toJSON())[0]['total']
      : 0;
  const totalPengeluaran =
    pengeluaran?.map((r) => r.toJSON()).length > 0
      ? pengeluaran?.map((r) => r.toJSON())[0]['total']
      : 0;
  const totalTransfer =
    transfer?.map((r) => r.toJSON()).length > 0
      ? transfer?.map((r) => r.toJSON())[0]['total']
      : 0;
  const totalTransferan =
      transferan?.map((r) => r.toJSON()).length > 0
        ? transferan?.map((r) => r.toJSON())[0]['total']
        : 0;
  const totalTransaksi = totalPemasukan - totalPengeluaran;

  const ret = {
    totalPemasukan,
    totalPengeluaran,
    totalTransfer,
    totalTransferan,
    totalTransaksi
  };

  res.json({
    message: 'success',
    data: ret
  });
}
