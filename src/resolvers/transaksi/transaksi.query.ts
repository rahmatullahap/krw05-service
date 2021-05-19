import { where, Sequelize, Op } from 'sequelize';
import { TransaksiModel } from '../model';
import { SearchTransaksiQueryArgs } from '.';

/**
 * Query for get transaksis
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @param {any} ctx current context
 * @returns
 */
export async function searchTransaksiQuery(req, res): Promise<any> {
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

  res.json(ret);
}

export async function searchTransaksiByIdQuery(req, res): Promise<any> {
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

    res.json(transaksi);
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    });
  }
}
