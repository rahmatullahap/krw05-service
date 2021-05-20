import { Router } from 'express';
import { middleware } from '../../middleware/access';
import {
  addKeluarMutation,
  removeKeluarMutation,
  updateKeluarMutation
} from './keluar.mutation';
import { searchKeluarByIdQuery, searchKeluarQuery } from './keluar.query';

export interface SearchKeluarQueryArgs {
  keyword: string;
  limit: number;
  skip: number;
  list: boolean;
}

export interface KeluarMutationArgs {
  jeniskeluar: string;
  groupkeluar: number;
  unitid?: number;
}

const keluarRouter = Router();
keluarRouter.use('/', middleware);
keluarRouter.get('/', searchKeluarQuery);
keluarRouter.get('/:id', searchKeluarByIdQuery);
keluarRouter.post('/add', addKeluarMutation);
keluarRouter.delete('/delete/:id', removeKeluarMutation);
keluarRouter.put('/edit/:id', updateKeluarMutation);

export default keluarRouter;
