import { GroupMasuk, GroupMasukModel } from '../model';
import { GroupMasukMutationArgs } from '.';
import { getContextFromAuth } from '../../middleware/access';

/**
 * Mutation for create groupMasuk class
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @param {any} ctx current context
 * @returns
 */
export async function addGroupMasukMutation(req, res): Promise<any> {
  const ctx = getContextFromAuth(req.headers.authorization);
  const args = req.body as GroupMasukMutationArgs;
  const response = await GroupMasukModel.create({
    groupmasuk: args.groupmasuk,
    unitid: ctx.unitid
  });

  const groupMasuk = response?.toJSON() as GroupMasuk;
  res.json({
    message: 'success',
    data: {
      groupmasuk: groupMasuk.groupmasuk,
      unitid: groupMasuk.unitid
    }
  });
}

/**
 * Mutation for delete groupMasuk class
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @param {any} ctx current context
 * @returns
 */
export async function removeGroupMasukMutation(req, res): Promise<any> {
  const id = req.params.id;
  try {
    // check if groupMasuk exists
    const groupMasuk = await GroupMasukModel.findOne({
      where: {
        id
      }
    });
    if (!groupMasuk) {
      throw Error(`groupMasuk with id ${id} not found`);
    }

    // remove groupMasuk
    const remove = await GroupMasukModel.destroy({
      where: {
        id
      }
    });
    if (!remove) {
      throw Error(`groupMasuk with id ${id} remove failed`);
    }

    res.json({
      message: 'success',
      data: groupMasuk
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    });
  }
}

/**
 * update groupMasuk
 * @export
 * @param {*} _
 * @param {GroupMasukMutationGroupMasukArgs} args
 * @returns {Promise<any>}
 */
export async function updateGroupMasukMutation(req, res): Promise<any> {
  const args = req.body as GroupMasukMutationArgs;
  const id = req.params.id;
  try {
    let response = await GroupMasukModel.findOne({
      where: {
        id
      }
    });

    if (!response) {
      throw Error(`GroupMasuk with id ${id} not found`);
    }

    if (args.groupmasuk) {
      response.set('groupmasuk', args.groupmasuk);
    }

    response = await response.save();
    const result = response?.toJSON() as GroupMasuk;

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
