import { makeModule } from '@/context';
import { makeMongoProvider, MongoProvider } from '@/_lib/MongoProvider';
import { asValue } from 'awilix';
import { Db, MongoClient } from 'mongodb';

type MongoConfig = {
  mongodb: {
    database: string;
    host: string;
    username: string;
    password: string;
  };
};

const mongo = makeModule('mongo', async ({ container: { register }, config: { mongodb } }) => {
  const client = new MongoClient(mongodb.host, {
    auth: { username: mongodb.username, password: mongodb.password },
  });

  await client.connect();

  const db = client.db(mongodb.database);

  const mongoProvider = makeMongoProvider({ db });

  register({
    mongo: asValue(db),
    mongoProvider: asValue(mongoProvider),
  });

  return async () => {
    await client.close();
  };
});

type DatabaseRegistry = {
  mongo: Db;
  mongoProvider: MongoProvider;
};

export { mongo };
export type { DatabaseRegistry, MongoConfig };
