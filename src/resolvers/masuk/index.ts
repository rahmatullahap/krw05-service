import { Router } from 'express';
import { middleware } from '../../middleware/access';
import { searchMasukByIdQuery, searchMasukQuery } from './masuk.query';

export interface SearchMasukQueryArgs {
  keyword: string;
  limit: number;
  skip: number;
}

const masukRouter = Router();
masukRouter.use('/', middleware);
masukRouter.get('/', searchMasukQuery);
masukRouter.get('/:id', searchMasukByIdQuery);

export default masukRouter;
