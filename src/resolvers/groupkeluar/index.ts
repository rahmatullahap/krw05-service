import { Router } from 'express';
import { middleware } from '../../middleware/access';
import {
  addGroupKeluarMutation,
  removeGroupKeluarMutation,
  updateGroupKeluarMutation
} from './groupkeluar.mutation';
import {
  searchGroupKeluarByIdQuery,
  searchGroupKeluarQuery
} from './groupkeluar.query';

export interface SearchGroupKeluarQueryArgs {
  keyword: string;
  limit: number;
  skip: number;
}

export interface GroupKeluarMutationArgs {
  groupkeluar: string;
}

const groupKeluarRouter = Router();
groupKeluarRouter.use('/', middleware);
groupKeluarRouter.get('/', searchGroupKeluarQuery);
groupKeluarRouter.get('/:id', searchGroupKeluarByIdQuery);
groupKeluarRouter.post('/add', addGroupKeluarMutation);
groupKeluarRouter.delete('/delete/:id', removeGroupKeluarMutation);
groupKeluarRouter.put('/edit/:id', updateGroupKeluarMutation);

export default groupKeluarRouter;
