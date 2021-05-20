import { Router } from 'express';
import { middleware } from '../../middleware/access';
import { searchKeluarByIdQuery, searchKeluarQuery } from './keluar.query';

export interface SearchKeluarQueryArgs {
  keyword: string;
  limit: number;
  skip: number;
}

const keluarRouter = Router();
keluarRouter.use('/', middleware);
keluarRouter.get('/', searchKeluarQuery);
keluarRouter.get('/:id', searchKeluarByIdQuery);

export default keluarRouter;
