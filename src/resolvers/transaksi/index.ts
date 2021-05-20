import { Router } from 'express';
import { middleware } from '../../middleware/access';
import {
  addTransaksiMutation,
  removeTransaksiMutation,
  updateTransaksiMutation
} from './transaksi.mutation';
import {
  listPemasukanQuery,
  listPengeluaranQuery,
  searchTransaksiByIdQuery,
  searchTransaksiQuery
} from './transaksi.query';

export interface SearchTransaksiQueryArgs {
  keyword: string;
  limit: number;
  skip: number;
}

export interface TransaksiMutationArgs {
  jenis: string;
  jenisid: string;
  jumlah: number;
  saldo: string;
  sign: string;
  tanggal: Date;
  unitidtujuan: number;
  uraian: string;
  unitid: number;
  userid: string;
}

const transaksiRouter = Router();
transaksiRouter.use('/', middleware);
transaksiRouter.get('/', searchTransaksiQuery);
transaksiRouter.get('/pengeluaran', listPengeluaranQuery);
transaksiRouter.get('/pemasukan', listPemasukanQuery);
transaksiRouter.get('/:id', searchTransaksiByIdQuery);
transaksiRouter.post('/add', addTransaksiMutation);
transaksiRouter.delete('/delete/:id', removeTransaksiMutation);
transaksiRouter.put('/edit/:id', updateTransaksiMutation);

export default transaksiRouter;
