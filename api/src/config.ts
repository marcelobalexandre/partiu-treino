import { REPLConfig } from '@/_boot/repl';
import { environment, EnvironmentConfig, envNumber, envString } from '@/_lib/Environment';
import { ServerConfig } from '@/_boot/server';
import { MongoConfig } from '@/_boot/mongo';
import { PostgresConfig } from '@/_boot/postgres';
import { SwaggerConfig } from '@/_boot/swagger';
import { AppModulesConfig } from '@/_boot/appModules';

type Configuration = ServerConfig & MongoConfig & PostgresConfig & EnvironmentConfig & REPLConfig & SwaggerConfig & AppModulesConfig;

const config: Configuration = {
  appName: 'api',
  cli: process.argv.includes('--cli'),
  environment: environment(),
  repl: {
    port: envNumber('REPL_PORT', 2580),
  },
  http: {
    host: envString('HOST', 'localhost'),
    port: envNumber('PORT', 3001),
  },
  swagger: {
    title: 'API',
    version: '1.0.0',
    host: envString('SWAGGER_HOST', envString('HOST', 'localhost')),
    basePath: '/api',
    docEndpoint: '/api-docs',
  },
  mongodb: {
    database: envString('MONGODB_NAME', 'blog'),
    host: envString('MONGODB_HOST', 'mongodb://localhost:27017'),
    username: envString('MONGODB_USER', 'blog'),
    password: envString('MONGODB_PASS', 'blog'),
  },
  postgres: {
    host: envString('POSTGRES_HOST', 'postgres'),
    port: envNumber('POSTGRES_PORT', 5432),
    username: envString('POSTGRES_USER', 'postgres'),
    password: envString('POSTGRES_PASS', 'postgres'),
    database: envString('POSTGRES_DB', 'partiu_treino_dev')
  }
};

export { config };
export type { Configuration };
