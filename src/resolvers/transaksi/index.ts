import { Router } from 'express';
import { middleware } from '../../middleware/access';
import {
  searchTransaksiByIdQuery,
  searchTransaksiQuery
} from './transaksi.query';

export interface SearchTransaksiQueryArgs {
  keyword: string;
  limit: number;
  skip: number;
}

const transaksiRouter = Router();
transaksiRouter.use('/', middleware);
transaksiRouter.get('/', searchTransaksiQuery);
transaksiRouter.get('/:id', searchTransaksiByIdQuery);

export default transaksiRouter;
