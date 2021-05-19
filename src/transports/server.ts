import express from 'express';
import { Express } from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { Settings } from 'luxon';

import bodyParser from 'body-parser';
import cors from 'cors';

import { config } from '../config';
import { createNodeLogger } from '../connectors/logger.node';
import { ILogger } from '../connectors/logger';
import { Sequelize } from 'sequelize';
import { db as configDB } from '../lib';
import { Api } from '../resolvers/routes';
import { setupModels } from '../resolvers/model';

const { log, app, httpServer } = config;

// set default timezone
Settings.defaultZoneName = app.timezone;

/**
 * Server to enable user to remotely execute graphql operations via http request & websocket connections
 */
export class RestServer {
  private server: http.Server;
  private app: Express;
  private logger: ILogger;
  private sequelize: Sequelize;

  constructor(private isProd = false) {
    this.logger = createNodeLogger(log.level);
    this.app = express();
    this.app.options('*', cors());
    this.app.use(bodyParser.json());
    this.app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    });
  }

  /**
   * Create http server
   */
  createHTTPServer(): http.Server {
    // create server
    let server = http.createServer(this.app);

    // add tls termination
    if (httpServer.secure) {
      let key = '';
      let cert = '';
      // try load from file
      try {
        this.logger.debug('load tls key from directory');
        key = fs.readFileSync(httpServer.key, 'utf8');
        cert = fs.readFileSync(httpServer.cert, 'utf8');
      } catch (err) {
        this.logger.debug('load tls key from environment');
        key = httpServer.key;
        cert = httpServer.cert;
      }
      server = https.createServer({ key, cert }, this.app);
    }

    return server;
  }

  /**
   * run http server
   */
  async run(): Promise<void> {
    try {
      this.sequelize = configDB;
      setupModels(this.sequelize);
      this.sequelize.sync({ alter: true });
      const api = new Api(this.app);
      api.init();
      this.server = this.createHTTPServer();
    } catch (err) {
      this.logger.error('failed to get server context');
      this.logger.error(err);
    }

    this.server.listen(httpServer.port, () => {
      this.logger.info(
        '🚀 server is running at %s://localhost:%d',
        httpServer.secure ? 'https' : 'http',
        httpServer.port
      );
      this.logger.info('Press CTRL-C to stop\n');
    });
  }

  /**
   * Stop server gracefully
   */
  async stop() {
    await new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          return reject(err);
        }
        resolve(null);
      });
    });
  }
}
