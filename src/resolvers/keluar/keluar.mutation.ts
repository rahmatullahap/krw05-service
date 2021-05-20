import { Keluar, KeluarModel } from '../model';
import { KeluarMutationArgs } from '.';
import { getContextFromAuth } from '../../middleware/access';

/**
 * Mutation for create Keluar class
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @param {any} ctx current context
 * @returns
 */
export async function addKeluarMutation(req, res) {
  const ctx = getContextFromAuth(req.headers.authorization);
  const args = req.body as KeluarMutationArgs;
  const response = await KeluarModel.create({
    jeniskeluar: args.jeniskeluar,
    groupkeluar: args.groupkeluar,
    unitid: ctx.unitid
  });

  const keluar = response?.toJSON() as Keluar;
  res.json({
    message: 'success',
    data: {
      jeniskeluar: keluar.jeniskeluar,
      groupkeluar: keluar.groupkeluar,
      unitid: keluar.unitid
    }
  });
}

/**
 * Mutation for delete Keluar class
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @param {any} ctx current context
 * @returns
 */
export async function removeKeluarMutation(req, res) {
  const id = req.params.id;
  try {
    // check if Keluar exists
    const keluar = await KeluarModel.findOne({
      where: {
        keluarid: id
      }
    });
    if (!keluar) {
      throw Error(`Keluar with id ${id} not found`);
    }

    // remove Keluar
    const remove = await KeluarModel.destroy({
      where: {
        keluarid: id
      }
    });
    if (!remove) {
      throw Error(`Keluar with id ${id} remove failed`);
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

/**
 * update Keluar
 * @export
 * @param {*} _
 * @param {KeluarMutationKeluarArgs} args
 * @returns {Promise<any>}
 */
export async function updateKeluarMutation(req, res) {
  const args = req.body as KeluarMutationArgs;
  const id = req.params.id;
  try {
    let response = await KeluarModel.findOne({
      where: {
        keluarid: id
      }
    });

    if (!response) {
      throw Error(`Keluar with id ${id} not found`);
    }

    if (args.jeniskeluar) {
      response.set('jeniskeluar', args.jeniskeluar);
    }
    if (args.groupkeluar) {
      response.set('groupkeluar', args.groupkeluar);
    }

    response = await response.save();
    const result = response?.toJSON() as Keluar;

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
