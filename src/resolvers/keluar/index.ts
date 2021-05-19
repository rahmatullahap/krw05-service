import { Router } from 'express';
import { searchKeluarByIdQuery, searchKeluarQuery } from './keluar.query';

export interface SearchKeluarQueryArgs {
  keyword: string;
  limit: number;
  skip: number;
}

const keluarRouter = Router();
keluarRouter.get('/', searchKeluarQuery);
keluarRouter.get('/:id', searchKeluarByIdQuery);

export default keluarRouter;
