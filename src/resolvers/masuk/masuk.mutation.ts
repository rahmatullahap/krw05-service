import { Masuk, MasukModel } from '../model';
import { MasukMutationArgs } from '.';
import { getContextFromAuth } from '../../middleware/access';

/**
 * Mutation for create Masuk class
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @param {any} ctx current context
 * @returns
 */
export async function addMasukMutation(req, res) {
  const ctx = getContextFromAuth(req.headers.authorization);
  const args = req.body as MasukMutationArgs;
  const response = await MasukModel.create({
    jenismasuk: args.jenismasuk,
    groupmasuk: args.groupmasuk,
    unitid: ctx.unitid
  });

  const masuk = response?.toJSON() as Masuk;
  res.json({
    message: 'success',
    data: {
      jenismasuk: masuk.jenismasuk,
      groupmasuk: masuk.groupmasuk,
      unitid: masuk.unitid
    }
  });
}

/**
 * Mutation for delete Masuk class
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @param {any} ctx current context
 * @returns
 */
export async function removeMasukMutation(req, res) {
  const id = req.params.id;
  try {
    // check if Masuk exists
    const masuk = await MasukModel.findOne({
      where: {
        masukid: id
      }
    });
    if (!masuk) {
      throw Error(`Masuk with id ${id} not found`);
    }

    // remove Masuk
    const remove = await MasukModel.destroy({
      where: {
        masukid: id
      }
    });
    if (!remove) {
      throw Error(`Masuk with id ${id} remove failed`);
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

/**
 * update Masuk
 * @export
 * @param {*} _
 * @param {MasukMutationMasukArgs} args
 * @returns {Promise<any>}
 */
export async function updateMasukMutation(req, res) {
  const args = req.body as MasukMutationArgs;
  const id = req.params.id;
  try {
    let response = await MasukModel.findOne({
      where: {
        masukid: id
      }
    });

    if (!response) {
      throw Error(`Masuk with id ${id} not found`);
    }

    if (args.jenismasuk) {
      response.set('jenismasuk', args.jenismasuk);
    }
    if (args.groupmasuk) {
      response.set('groupmasuk', args.groupmasuk);
    }

    response = await response.save();
    const result = response?.toJSON() as Masuk;

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
