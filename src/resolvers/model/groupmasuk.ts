import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';

export let GroupMasukModel: ModelCtor<Model<GroupMasuk>>;

/**
 * Define group masuk class models
 *
 * @export
 * @param {Sequelize} db connection instance
 * @returns operation schedule model definition
 */
export function defineGroupMasukModel(db: Sequelize) {
  GroupMasukModel = db.define<Model<GroupMasuk>>(
    'groupmasuk',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      groupmasuk: DataTypes.STRING,
      unitid: DataTypes.INTEGER
    },
    { timestamps: false, freezeTableName: true }
  );
}

/**
 * GroupMasuk Class Model data structure
 *
 * @export
 * @interface GroupMasuk
 */
export interface GroupMasuk {
  id?: number;
  groupmasuk: string;
  unitid: number;
}
