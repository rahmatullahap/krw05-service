import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';

export let UserModel: ModelCtor<Model<User>>;

/**
 * Define user class models
 *
 * @export
 * @param {Sequelize} db connection instance
 * @returns operation schedule model definition
 */
export function defineUserModel(db: Sequelize) {
  UserModel = db.define<Model<User>>(
    'user',
    {
      userid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      unitid: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      hakakses: {
        type: DataTypes.ENUM,
        values: [HakAkses.admin.toString(), HakAkses.administrator.toString()],
        defaultValue: HakAkses.admin.toString()
      }
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
          attributes.set('userid', id);
        }
      }
    }
  );
}

export enum HakAkses {
  admin = 'admin',
  administrator = 'administrator'
}

/**
 * User Class Model data structure
 *
 * @export
 * @interface User
 */
export interface User {
  userid?: string;
  unitid: number;
  nama: string;
  password: string;
  hakakses: HakAkses;
  salt: string;
}
