import { server } from '@/_boot/server';
import { appModules } from '@/_boot/appModules';
import { asValue } from 'awilix';
import { mongo } from '@/_boot/mongo';
import { postgres } from '@/_boot/postgres';
import { repl } from '@/_boot/repl';
import { withContext } from '@/context';
import { Configuration } from '@/config';
import { Logger } from 'pino';
import { pubSub } from '@/_boot/pubSub';
import { MessageBundle } from '@/messages';
import { swagger } from '@/_boot/swagger';

const main = withContext(async ({ app, container, config, bootstrap, logger, messageBundle }) => {
  container.register({
    app: asValue(app),
    messageBundle: asValue(messageBundle),
    logger: asValue(logger),
    startedAt: asValue(new Date()),
    config: asValue(config),
  });

  await bootstrap(mongo, postgres, server, swagger, pubSub, repl, ...appModules);
});

type MainRegistry = {
  app: any;
  messageBundle: MessageBundle;
  startedAt: Date;
  logger: Logger;
  config: Configuration;
};

export { main };
export type { MainRegistry };
