import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';

export let KeluarModel: ModelCtor<Model<Keluar>>;

/**
 * Define keluar class models
 *
 * @export
 * @param {Sequelize} db connection instance
 * @returns operation schedule model definition
 */
export function defineKeluarModel(db: Sequelize) {
  KeluarModel = db.define<Model<Keluar>>(
    'keluar',
    {
      keluarid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      groupkeluar: DataTypes.INTEGER,
      jeniskeluar: DataTypes.STRING,
      unitid: DataTypes.INTEGER
    },
    { timestamps: false, freezeTableName: true }
  );
}

/**
 * Keluar Class Model data structure
 *
 * @export
 * @interface Keluar
 */
export interface Keluar {
  keluarid?: number;
  groupkeluar: number;
  jeniskeluar: string;
  unitid: number;
}
