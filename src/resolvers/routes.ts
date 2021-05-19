import { ILogger } from '../connectors/logger';
import { Express } from 'express';
import userRouter from './user';
import authRouter from './auth';
import unitRouter from './unit';
import transaksiRouter from './transaksi';
import masukRouter from './masuk';
import keluarRouter from './keluar';
import groupMasukRouter from './groupmasuk';
import groupKeluarRouter from './groupkeluar';

export class Api {
  app: Express;
  logger: ILogger;
  constructor(app: Express) {
    this.app = app;
  }

  init() {
    this.app.use('/', authRouter);
    this.app.use('/user', userRouter);
    this.app.use('/unit', unitRouter);
    this.app.use('/transaksi', transaksiRouter);
    this.app.use('/masuk', masukRouter);
    this.app.use('/keluar', keluarRouter);
    this.app.use('/groupmasuk', groupMasukRouter);
    this.app.use('/groupkeluar', groupKeluarRouter);
  }
}
