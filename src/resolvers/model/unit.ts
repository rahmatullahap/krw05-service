import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';

export let UnitModel: ModelCtor<Model<Unit>>;

/**
 * Define unit class models
 *
 * @export
 * @param {Sequelize} db connection instance
 * @returns operation schedule model definition
 */
export function defineUnitModel(db: Sequelize) {
  UnitModel = db.define<Model<Unit>>(
    'unit',
    {
      unitid: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      namaunit: DataTypes.STRING,
      hirarki: DataTypes.INTEGER
    },
    { timestamps: false, freezeTableName: true }
  );
}

/**
 * Unit Class Model data structure
 *
 * @export
 * @interface Unit
 */
export interface Unit {
  unitid?: number;
  namaunit: string;
  hirarki: number;
}
