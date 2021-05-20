import { GroupKeluar, GroupKeluarModel } from '../model';
import { GroupKeluarMutationArgs } from '.';
import { getContextFromAuth } from '../../middleware/access';

/**
 * Mutation for create groupKeluar class
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @param {any} ctx current context
 * @returns
 */
export async function addGroupKeluarMutation(req, res) {
  const ctx = getContextFromAuth(req.headers.authorization);
  const args = req.body as GroupKeluarMutationArgs;

  const response = await GroupKeluarModel.create({
    groupkeluar: args.groupkeluar,
    unitid: ctx.unitid
  });

  const groupKeluar = response?.toJSON() as GroupKeluar;
  res.json({
    message: 'success',
    data: {
      groupkeluar: groupKeluar.groupkeluar,
      unitid: groupKeluar.unitid
    }
  });
}

/**
 * Mutation for delete groupKeluar class
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @param {any} ctx current context
 * @returns
 */
export async function removeGroupKeluarMutation(req, res) {
  const id = req.params.id;
  try {
    // check if groupKeluar exists
    const groupKeluar = await GroupKeluarModel.findOne({
      where: {
        id
      }
    });
    if (!groupKeluar) {
      throw Error(`groupKeluar with id ${id} not found`);
    }

    // remove groupKeluar
    const remove = await GroupKeluarModel.destroy({
      where: {
        id
      }
    });
    if (!remove) {
      throw Error(`groupKeluar with id ${id} remove failed`);
    }

    res.json({
      message: 'success',
      data: groupKeluar
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    });
  }
}

/**
 * update groupKeluar
 * @export
 * @param {*} _
 * @param {GroupKeluarMutationGroupKeluarArgs} args
 * @returns {Promise<any>}
 */
export async function updateGroupKeluarMutation(req, res) {
  const args = req.body as GroupKeluarMutationArgs;
  const id = req.params.id;
  try {
    let response = await GroupKeluarModel.findOne({
      where: {
        id
      }
    });

    if (!response) {
      throw Error(`GroupKeluar with id ${id} not found`);
    }

    if (args.groupkeluar) {
      response.set('groupkeluar', args.groupkeluar);
    }

    response = await response.save();
    const result = response?.toJSON() as GroupKeluar;

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
