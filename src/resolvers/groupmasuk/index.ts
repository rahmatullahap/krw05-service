import { Router } from 'express';
import { middleware } from '../../middleware/access';
import {
  addGroupMasukMutation,
  removeGroupMasukMutation,
  updateGroupMasukMutation
} from './groupmasuk.mutation';
import {
  searchGroupMasukByIdQuery,
  searchGroupMasukQuery
} from './groupmasuk.query';

export interface SearchGroupMasukQueryArgs {
  keyword: string;
  limit: number;
  skip: number;
  list: boolean;
}

export interface GroupMasukMutationArgs {
  groupmasuk: string;
}

const groupMasukRouter = Router();
groupMasukRouter.use('/', middleware);
groupMasukRouter.get('/', searchGroupMasukQuery);
groupMasukRouter.get('/:id', searchGroupMasukByIdQuery);
groupMasukRouter.post('/add', addGroupMasukMutation);
groupMasukRouter.delete('/delete/:id', removeGroupMasukMutation);
groupMasukRouter.put('/edit/:id', updateGroupMasukMutation);

export default groupMasukRouter;
