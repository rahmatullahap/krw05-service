import { Unit, UnitModel } from '../model';
import { AddUnitMutationArgs, UpdateUnitMutationArgs } from '.';

/**
 * Mutation for create unit class
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @returns
 */
export async function addUnitMutation(req, res) {
  const args = req.body as AddUnitMutationArgs;
  const response = await UnitModel.create({
    namaunit: args.namaunit,
    hirarki: args.hirarki
  });
  const unit = response?.toJSON() as Unit;
  res.json({
    message: 'success',
    data: unit
  });
}

/**
 * Mutation for delete unit class
 *
 * @export
 * @param {any} _
 * @param {any} args
 * @returns
 */
export async function removeUnitMutation(req, res) {
  const id = req.params.id;
  try {
    // check if unit exists
    const unit = await UnitModel.findOne({
      where: {
        unitid: id
      }
    });
    if (!unit) {
      throw Error(`unit with id ${id} not found`);
    }

    // remove unit
    const remove = await UnitModel.destroy({
      where: {
        unitid: id
      }
    });
    if (!remove) {
      throw Error(`unit with id ${id} remove failed`);
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

/**
 * update unit
 * @export
 * @param {*} _
 * @param {UnitMutationUpdateUnitArgs} args
 * @returns {Promise<any>}
 */
export async function updateUnitMutation(req, res) {
  const args = req.body as UpdateUnitMutationArgs;
  const id = req.params.id;
  try {
    let response = await UnitModel.findOne({
      where: {
        unitid: id
      }
    });

    if (!response) {
      throw Error(`Unit with id ${id} not found`);
    }

    if (args.namaunit) {
      response.set('namaunit', args.namaunit);
    }
    if (args.hirarki) {
      response.set('hirarki', args.hirarki);
    }

    response = await response.save();
    const result = response?.toJSON() as Unit;

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
