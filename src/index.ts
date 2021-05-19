import { RestServer } from './transports/server';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * function to route command line command
 */
async function cmd(args: string[]) {
  // create new server, then start server
  const app = new RestServer(isProduction);
  app.run();
}

cmd(process.argv.slice(2));
