import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';

export let TransaksiModel: ModelCtor<Model<Transaksi>>;

/**
 * Define transaksi class models
 *
 * @export
 * @param {Sequelize} db connection instance
 * @returns operation schedule model definition
 */
export function defineTransaksiModel(db: Sequelize) {
  TransaksiModel = db.define<Model<Transaksi>>(
    'transaksi',
    {
      transaksiid: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      jenis: DataTypes.STRING,
      jenisid: DataTypes.STRING,
      jumlah: DataTypes.FLOAT,
      saldo: DataTypes.DOUBLE,
      sign: DataTypes.CHAR,
      tanggal: DataTypes.DATE,
      unitid: DataTypes.INTEGER,
      unitidtujuan: DataTypes.INTEGER,
      uraian: DataTypes.STRING,
      userid: DataTypes.STRING
    },
    { timestamps: false, freezeTableName: true }
  );
}

/**
 * Transaksi Class Model data structure
 *
 * @export
 * @interface Transaksi
 */
export interface Transaksi {
  transaksiid?: number;
  jenis: string;
  jenisid: string;
  jumlah: number;
  saldo: string;
  sign: string;
  tanggal: Date;
  unitid: number;
  unitidtujuan: number;
  uraian: string;
  userid: string;
}
