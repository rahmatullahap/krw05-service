import { Router } from 'express';
import { middleware } from '../../middleware/access';
import {
  addUnitMutation,
  removeUnitMutation,
  updateUnitMutation
} from './unit.mutation';
import { searchUnitByIdQuery, searchUnitQuery } from './unit.query';

export interface SearchUnitQueryArgs {
  keyword: string;
  limit: number;
  skip: number;
}

export interface UnitMutationArgs {
  namaunit: string;
  hirarki: number;
}

export interface AddUnitMutationArgs extends UnitMutationArgs {}
export interface UpdateUnitMutationArgs extends UnitMutationArgs {}

const unitRouter = Router();
unitRouter.use('/', middleware);
unitRouter.get('/', searchUnitQuery);
unitRouter.get('/:id', searchUnitByIdQuery);
unitRouter.post('/add', addUnitMutation);
unitRouter.delete('/delete/:id', removeUnitMutation);
unitRouter.put('/edit/:id', updateUnitMutation);

export default unitRouter;
