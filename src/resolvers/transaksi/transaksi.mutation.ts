import { Transaksi, TransaksiModel, Unit, UnitModel } from '../model';
import { TransaksiMutationArgs, TransferMutationArgs } from '.';
import { getContextFromAuth } from '../../middleware/access';

/**
 * Mutation for create transaksi class
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @returns
 */
export async function addTransaksiMutation(req, res) {
  const ctx = getContextFromAuth(req.headers.authorization);
  const args = req.body as TransaksiMutationArgs;
  const response = await TransaksiModel.create({
    jenis: args.jenis,
    jenisid: args.jenisid,
    jumlah: args.jumlah,
    saldo: args.saldo,
    sign: args.sign,
    tanggal: new Date(),
    unitidtujuan: args.unitidtujuan,
    uraian: args.uraian,
    unitid: ctx.unitid,
    userid: ctx.userid
  });
  const transaksi = response?.toJSON() as Transaksi;
  res.json({
    message: 'success',
    data: transaksi
  });
}

export async function addTransferMutation(req, res) {
  const ctx = getContextFromAuth(req.headers.authorization);
  const args = req.body as TransferMutationArgs;
  const responseOut = await TransaksiModel.create({
    jenis: 'KELUAR',
    jenisid: 'TRANSFER',
    jumlah: args.jumlah,
    saldo: args.saldo,
    sign: '-',
    tanggal: new Date(),
    unitidtujuan: args.unitidtujuan,
    uraian: args.uraian,
    unitid: ctx.unitid,
    userid: ctx.userid
  });
  const transfer = responseOut?.toJSON() as Transaksi;

  let unitTujuan: Unit = null;
  try {
    const unitRes = await UnitModel.findOne({
      where: {
        unitid: args.unitidtujuan
      }
    });
    if (!unitRes) {
      throw Error(`unit target with id ${args.unitidtujuan} not found`);
    }

    unitTujuan = unitRes?.toJSON() as Unit;
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    });
  }

  const responseIn = await TransaksiModel.create({
    jenis: unitTujuan?.namaunit,
    jenisid: 'TRANSFERAN',
    jumlah: args.jumlah,
    saldo: args.saldo,
    sign: '+',
    tanggal: new Date(),
    unitidtujuan: unitTujuan?.unitid,
    uraian: args.uraian,
    unitid: ctx.unitid,
    userid: ctx.userid
  });
  const transferan = responseIn?.toJSON() as Transaksi;

  res.json({
    message: 'success',
    data: {
      transfer,
      transferan
    }
  });
}

/**
 * Mutation for delete transaksi class
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @returns
 */
export async function removeTransaksiMutation(req, res) {
  const id = req.params.id;
  try {
    // check if transaksi exists
    const transaksi = await TransaksiModel.findOne({
      where: {
        transaksiid: id
      }
    });
    if (!transaksi) {
      throw Error(`transaksi with id ${id} not found`);
    }

    // remove transaksi
    const remove = await TransaksiModel.destroy({
      where: {
        transaksiid: id
      }
    });
    if (!remove) {
      throw Error(`transaksi with id ${id} remove failed`);
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

/**
 * update transaksi
 * @export
 * @param {*} _
 * @param {TransaksiMutationUpdateTransaksiArgs} args
 * @returns {Promise<any>}
 */
export async function updateTransaksiMutation(req, res) {
  const args = req.body as TransaksiMutationArgs;
  const id = req.params.id;
  try {
    let response = await TransaksiModel.findOne({
      where: {
        transaksiid: id
      }
    });

    if (!response) {
      throw Error(`Transaksi with id ${id} not found`);
    }

    if (args.jenis) {
      response.set('jenis', args.jenis);
    }
    if (args.jenisid) {
      response.set('jenisid', args.jenisid);
    }
    if (args.jumlah) {
      response.set('jumlah', args.jumlah);
    }
    if (args.saldo) {
      response.set('saldo', args.saldo);
    }
    if (args.sign) {
      response.set('sign', args.sign);
    }
    if (args.unitidtujuan) {
      response.set('unitidtujuan', args.unitidtujuan);
    }
    if (args.uraian) {
      response.set('uraian', args.uraian);
    }

    response = await response.save();
    const result = response?.toJSON() as Transaksi;

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
