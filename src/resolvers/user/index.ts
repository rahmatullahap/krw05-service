import { Router } from 'express';
import { middlewareAdministrator } from '../../middleware/access';
import { HakAkses } from '../model';
import {
  addUserMutation,
  removeUserMutation,
  updateUserMutation
} from './user.mutation';
import { searchUserByIdQuery, searchUserQuery } from './user.query';

export interface SearchUserQueryArgs {
  keyword: string;
  limit: number;
  skip: number;
}

export interface UserMutationArgs {
  userid: string;
  unitid: number;
  nama: string;
  password: string;
  hakakses: HakAkses;
}

export interface AddUserMutationArgs extends UserMutationArgs {}
export interface UpdateUserMutationArgs extends UserMutationArgs {}

const userRouter = Router();
userRouter.get('/', middlewareAdministrator);
userRouter.get('/', searchUserQuery);
userRouter.get('/:id', searchUserByIdQuery);
userRouter.post('/add', addUserMutation);
userRouter.delete('/delete/:id', middlewareAdministrator);
userRouter.delete('/delete/:id', removeUserMutation);
userRouter.put('/edit/:id', middlewareAdministrator);
userRouter.put('/edit/:id', updateUserMutation);

export default userRouter;
