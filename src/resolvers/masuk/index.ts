import { Router } from 'express';
import { searchMasukByIdQuery, searchMasukQuery } from './masuk.query';

export interface SearchMasukQueryArgs {
  keyword: string;
  limit: number;
  skip: number;
}

const masukRouter = Router();
masukRouter.get('/', searchMasukQuery);
masukRouter.get('/:id', searchMasukByIdQuery);

export default masukRouter;
