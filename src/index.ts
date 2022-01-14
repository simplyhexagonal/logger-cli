require('dotenv').config();

// @ts-ignore
import { version } from '../package.json';

import { resolve } from 'path';
import Logger, {
  LoggerTransportName,
  LoggerOptions,
} from '@simplyhexagonal/logger';

import DiscordTransport from '@simplyhexagonal/logger-transport-discord';

if (process.argv.includes('--version')) {
  console.log(version);
  process.exit(0);
}

const { stdin } = process;
let data:any = '';

stdin.setEncoding('utf8');

const getInput = () => {
  return new Promise((resolve, reject) => {
    stdin.on('data', (chunk) => {
      data += chunk;
    });

    stdin.on('end', () => {
      data = [data];
      resolve(data);
    });

    stdin.on('error', reject);
  });
};

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'all' | 'raw';

(async () => {
  let config: LoggerOptions;

  try {
    config = require(resolve(__dirname, '../logger.config.js')) as LoggerOptions;
  } catch (e) {
    config = {
      transports: {},
    };
  }

  const logger = new Logger(
    {
      optionsByLevel: {
        warn: [],
        info: [],
        debug: [],
        error: [],
        fatal: [],
        all: [],
        raw: [],
      },
      ...config,
      transports: {
        [`${LoggerTransportName.DISCORD}`]: DiscordTransport,
        ...config.transports,
      },
    }
  );

  const binArgIdx = process.argv.findIndex((arg) => (/logger\./).test(arg));

  if (binArgIdx === process.argv.length - 1) {
    await getInput();
  } else {
    data = process.argv.slice(binArgIdx + 1);
  }

  const loggerBinPath = process.argv[binArgIdx];
  const level = loggerBinPath?.split('/').pop()?.split('.')[1];

  await logger[level as LogLevel](...data);
})();
