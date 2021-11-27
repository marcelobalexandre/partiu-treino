import { makeModule } from '@/context';
import { createConnection, Connection } from 'typeorm';

type PostgresConfig = {
  postgres: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
};

const postgres = makeModule('postgres', async ({ config: { postgres } }) => {
  const connection: Connection = await createConnection({
    type: 'postgres',
    host: postgres.host,
    port: postgres.port,
    username: postgres.username,
    password: postgres.password,
    database: postgres.database,
    synchronize: true,
    entities: [__dirname + '/../**/infrastructure/*TypeORMEntity.ts']
});

  return async () => {
    await connection.close();
  };
});

export { postgres };
export type { PostgresConfig };
