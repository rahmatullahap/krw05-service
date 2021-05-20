import { Router } from 'express';
import { middleware } from '../../middleware/access';
import {
  addMasukMutation,
  removeMasukMutation,
  updateMasukMutation
} from './masuk.mutation';
import { searchMasukByIdQuery, searchMasukQuery } from './masuk.query';

export interface SearchMasukQueryArgs {
  keyword: string;
  limit: number;
  skip: number;
}

export interface MasukMutationArgs {
  jenismasuk: string;
  groupmasuk: number;
  unitid?: number;
}

const masukRouter = Router();
masukRouter.use('/', middleware);
masukRouter.get('/', searchMasukQuery);
masukRouter.get('/:id', searchMasukByIdQuery);
masukRouter.post('/add', addMasukMutation);
masukRouter.delete('/delete/:id', removeMasukMutation);
masukRouter.put('/edit/:id', updateMasukMutation);

export default masukRouter;
