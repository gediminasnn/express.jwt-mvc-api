import 'dotenv/config';
import { cleanEnv, port, str } from 'envalid';
import log4js from 'log4js';

export const validateEnv = (): void => {
  cleanEnv(process.env, {
    API_PORT: port(),
    NODE_ENV: str(),
    API_URL: str(),
    PRIVATE_KEY: str(),
    PUBLIC_KEY: str(),
  });
};

export const initLogger = (): void => {
  const logger = log4js.getLogger();
  logger.level = 'debug';

  console.log = (args) => logger.info(args);
  console.info = console.log;
  console.warn = (args) => logger.warn(args);
  console.error = (args) => logger.error(args);
  console.debug = (args) => logger.debug(args);
};
