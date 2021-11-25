import { PersonalTrainerCollection, PersonalTrainerSchema } from '@/personalTrainer/infrastructure/PersonalTrainerCollection';
import MUUID from 'uuid-mongodb';
import { FindPersonalTrainers } from '@/personalTrainer/query/FindPersonalTrainers';
import { Filter } from 'mongodb';

type Dependencies = {
  personalTrainerCollection: PersonalTrainerCollection;
};

const makeMongoFindPersonalTrainers =
  ({ personalTrainerCollection }: Dependencies): FindPersonalTrainers =>
  async ({ pagination, filter, sort }) => {
    let match: Filter<PersonalTrainerSchema> = {};

    if (filter.name) {
      match = {
        ...match,
        name: { $regex: `^${filter.name}`, $options: 'i' },
      };
    }

    const personalTrainers = await personalTrainerCollection
      .aggregate([
        {
          $match: match,
        },
        {
          $skip: Math.max(1 - pagination.page, 0) * pagination.pageSize,
        },
        {
          $limit: pagination.pageSize,
        },
        ...(sort?.length
          ? [{ $sort: sort.reduce((acc, { field, direction }) => ({ [field]: direction === 'asc' ? 1 : -1 }), {}) }]
          : []),
      ])
      .toArray<PersonalTrainerSchema>();

    const totalElements = await personalTrainerCollection.countDocuments(match);

    const totalPages = Math.ceil(totalElements / pagination.pageSize);

    return {
      data: personalTrainers.map((personalTrainer) => ({
        id: MUUID.from(personalTrainer._id).toString(),
        name: personalTrainer.name,
        email: personalTrainer.email,
        password: personalTrainer.password,
      })),
      page: {
        totalPages,
        pageSize: pagination.pageSize,
        totalElements,
        current: pagination.page,
        first: pagination.page === 1,
        last: pagination.page === totalPages,
      },
    };
  };

export { makeMongoFindPersonalTrainers };
