import { ILogger } from './logger';
import { LogLevel, createLogger } from 'bunyan';
import PrettyStream from 'bunyan-prettystream';

export function createNodeLogger(level: LogLevel): ILogger {
  const prettyStdOut = new PrettyStream();
  prettyStdOut.pipe(process.stdout);

  return createLogger({
    name: 'api-service',
    level,
    streams: [
      {
        level: 'debug',
        type: 'raw',
        stream: prettyStdOut
      }
    ]
  });
}
