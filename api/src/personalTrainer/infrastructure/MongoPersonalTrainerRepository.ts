import { PersonalTrainer } from '@/personalTrainer/domain/PersonalTrainer';
import { PersonalTrainerRepository } from '@/personalTrainer/domain/PersonalTrainerRepository';
import { PersonalTrainerCollection } from '@/personalTrainer/infrastructure/PersonalTrainerCollection';
import { PersonalTrainerMapper } from '@/personalTrainer/infrastructure/PersonalTrainerMapper';
import { PersonalTrainerId } from '@/_sharedKernel/domain/PersonalTrainerId';
import { PersonalTrainerIdProvider } from '@/_sharedKernel/infrastructure/PersonalTrainerIdProvider';
import { from, v4 } from 'uuid-mongodb';

type Dependencies = {
  personalTrainerCollection: PersonalTrainerCollection;
};

const makeMongoPersonalTrainerRepository = ({ personalTrainerCollection }: Dependencies): PersonalTrainerRepository => ({
  async getNextId(): Promise<PersonalTrainerId> {
    return Promise.resolve(PersonalTrainerIdProvider.create(v4().toString()));
  },
  async findById(id: string): Promise<PersonalTrainer.Type> {
    const personalTrainer = await personalTrainerCollection.findOne({ _id: from(id), deleted: false });

    if (!personalTrainer) {
      throw new Error('Personal trainer not found');
    }

    return PersonalTrainerMapper.toEntity(personalTrainer);
  },
  async store(entity: PersonalTrainer.Type): Promise<void> {
    const { _id, version, ...data } = PersonalTrainerMapper.toData(entity);

    const count = await personalTrainerCollection.countDocuments({ _id });

    if (count) {
      await personalTrainerCollection.updateOne(
        { _id, version, deleted: false },
        {
          $set: {
            ...data,
            updatedAt: new Date(),
            version: version + 1,
          },
        }
      );

      return;
    }

    await personalTrainerCollection.insertOne({
      _id,
      ...data,
      version,
    });
  },
});

export { makeMongoPersonalTrainerRepository };
