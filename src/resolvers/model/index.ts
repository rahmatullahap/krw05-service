import { Sequelize } from 'sequelize';
import { defineGroupKeluarModel } from './groupkeluar';
import { defineGroupMasukModel } from './groupmasuk';
import { defineKeluarModel } from './keluar';
import { defineMasukModel } from './masuk';
import { defineTransaksiModel } from './transaksi';
import { defineUnitModel } from './unit';
import { defineUserModel } from './user';

/**
 * this will setup model and its relationship
 * @param db - sequalize instance
 */
export function setupModels(db: Sequelize): void {
  defineUserModel(db);
  defineUnitModel(db);
  defineTransaksiModel(db);
  defineMasukModel(db);
  defineKeluarModel(db);
  defineGroupMasukModel(db);
  defineGroupKeluarModel(db);
}

export * from './user';
export * from './unit';
export * from './transaksi';
export * from './masuk';
export * from './keluar';
export * from './groupmasuk';
export * from './groupkeluar';
