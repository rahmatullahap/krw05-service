import { Router } from 'express';
import { searchGroupKeluarByIdQuery, searchGroupKeluarQuery } from './keluar.query';

export interface SearchGroupKeluarQueryArgs {
  keyword: string;
  limit: number;
  skip: number;
}

const groupKeluarRouter = Router();
groupKeluarRouter.get('/', searchGroupKeluarQuery);
groupKeluarRouter.get('/:id', searchGroupKeluarByIdQuery);

export default groupKeluarRouter;
