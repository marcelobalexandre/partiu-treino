import { Collection, Db } from 'mongodb';
import { MUUID } from 'uuid-mongodb';

type PersonalTrainerSchema = {
  _id: MUUID;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

type PersonalTrainerCollection = Collection<PersonalTrainerSchema>;

const initPersonalTrainerCollection = async (db: Db): Promise<PersonalTrainerCollection> => {
  const collection: PersonalTrainerCollection = db.collection('personalTrainer');

  await collection.createIndex({ email: 1 }, { unique: true });
  await collection.createIndex({ _id: 1, version: 1 });

  return collection;
};

export { initPersonalTrainerCollection };
export type { PersonalTrainerSchema, PersonalTrainerCollection };
