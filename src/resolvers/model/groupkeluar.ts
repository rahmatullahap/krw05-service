import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';

export let GroupKeluarModel: ModelCtor<Model<GroupKeluar>>;

/**
 * Define group keluar class models
 *
 * @export
 * @param {Sequelize} db connection instance
 * @returns operation schedule model definition
 */
export function defineGroupKeluarModel(db: Sequelize) {
  GroupKeluarModel = db.define<Model<GroupKeluar>>(
    'groupkeluar',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      groupkeluar: DataTypes.STRING,
      unitid: DataTypes.INTEGER
    },
    { timestamps: false, freezeTableName: true }
  );
}

/**
 * GroupKeluar Class Model data structure
 *
 * @export
 * @interface GroupKeluar
 */
export interface GroupKeluar {
  id?: number;
  groupkeluar: string;
  unitid: number;
}
