import { Router } from 'express';
import {
  searchGroupMasukByIdQuery,
  searchGroupMasukQuery
} from './groupmasuk.query';

export interface SearchGroupMasukQueryArgs {
  keyword: string;
  limit: number;
  skip: number;
}

const groupMasukRouter = Router();
groupMasukRouter.get('/', searchGroupMasukQuery);
groupMasukRouter.get('/:id', searchGroupMasukByIdQuery);

export default groupMasukRouter;
