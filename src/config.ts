import rc from 'rc';
/**
 * Debug level
 */
type DebugLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/**
 * Configuration data structure
 *
 * @export
 * @interface Config
 */
export interface Config {
  log: {
    level: DebugLevel;
  };
  app: {
    timezone: string;
    secret: string;
  };
  mysql: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
  };
  httpServer: {
    port: number;
    secure: boolean;
    allowedOrigins: string[];
    key?: string;
    cert?: string;
  };
  telegram: {
    token: string;
    adminChatId: string;
    appUrl: string;
  };
}

export const configDefault: Config = {
  log: {
    level: 'error'
  },
  app: {
    timezone: '+07:00',
    secret: 'my-secret'
  },
  mysql: {
    host: 'localhost',
    port: 3306,
    database: 'mydatabase',
    username: 'root',
    password: null
  },
  httpServer: {
    port: 3000,
    secure: false,
    allowedOrigins: ['*'],
    key: 'server.key',
    cert: 'server.crt'
  },
  telegram: {
    token: '',
    adminChatId: '',
    appUrl: ''
  }
};

export const config = rc('api', configDefault) as Config;
