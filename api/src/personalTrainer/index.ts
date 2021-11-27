import { asFunction } from 'awilix';
import { CreatePersonalTrainer, makeCreatePersonalTrainer } from '@/personalTrainer/application/useCases/CreatePersonalTrainer';
import { PersonalTrainerRepository } from '@/personalTrainer/domain/PersonalTrainerRepository';
import { PersonalTrainerCollection, initPersonalTrainerCollection } from '@/personalTrainer/infrastructure/PersonalTrainerCollection';
import { makePostgresPersonalTrainerRepository } from '@/personalTrainer/infrastructure/PostgresPersonalTrainerRepository';
import { makePersonalTrainerController } from '@/personalTrainer/interface/http/personalTrainerController';
import { FindPersonalTrainers } from '@/personalTrainer/query/FindPersonalTrainers';
import { withMongoProvider } from '@/_lib/MongoProvider';
import { toContainerValues } from '@/_lib/di/containerAdapters';
import { makeMongoFindPersonalTrainers } from '@/personalTrainer/query/impl/MongoFindPersonalTrainers';
import { makeModule } from '@/context';
import { personalTrainerMessages } from '@/personalTrainer/messages';

const personalTrainerModule = makeModule(
  'personalTrainer',
  async ({ container: { register, build }, messageBundle: { updateBundle } }) => {
    const collections = await build(
      withMongoProvider({
        personalTrainerCollection: initPersonalTrainerCollection,
      })
    );

    updateBundle(personalTrainerMessages);

    register({
      ...toContainerValues(collections),
      personalTrainerRepository: asFunction(makePostgresPersonalTrainerRepository),
      createPersonalTrainer: asFunction(makeCreatePersonalTrainer),
      findPersonalTrainers: asFunction(makeMongoFindPersonalTrainers),
    });

    build(makePersonalTrainerController);
  }
);

type PersonalTrainerRegistry = {
  personalTrainerCollection: PersonalTrainerCollection;
  personalTrainerRepository: PersonalTrainerRepository;
  createPersonalTrainer: CreatePersonalTrainer;
  findPersonalTrainers: FindPersonalTrainers;
};

export { personalTrainerModule };
export type { PersonalTrainerRegistry };
