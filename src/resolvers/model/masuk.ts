import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';

export let MasukModel: ModelCtor<Model<Masuk>>;

/**
 * Define masuk class models
 *
 * @export
 * @param {Sequelize} db connection instance
 * @returns operation schedule model definition
 */
export function defineMasukModel(db: Sequelize) {
  MasukModel = db.define<Model<Masuk>>(
    'masuk',
    {
      masukid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      groupmasuk: DataTypes.INTEGER,
      jenismasuk: DataTypes.STRING,
      unitid: DataTypes.INTEGER
    },
    {
      timestamps: false,
      freezeTableName: true,
      hooks: {
        async beforeCreate(attributes) {
          const id = Math.random()
            .toString(36)
            .slice(2, 10)
            .toUpperCase();
          attributes.set('masukid', id);
        }
      }
    }
  );
}

/**
 * Masuk Class Model data structure
 *
 * @export
 * @interface Masuk
 */
export interface Masuk {
  masukid?: number;
  groupmasuk: number;
  jenismasuk: string;
  unitid: number;
}
