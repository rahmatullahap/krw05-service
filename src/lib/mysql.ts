import { Sequelize } from 'sequelize';
import { config } from '../config';
const { mysql, app } = config;

export const db: Sequelize = new Sequelize(
  mysql.database,
  mysql.username,
  mysql.password,
  {
    host: mysql.host,
    port: mysql.port,
    dialect: 'mysql',
    logging: false,
    timezone: app.timezone
  }
);
