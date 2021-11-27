import { PersonalTrainer } from '@/personalTrainer/domain/PersonalTrainer';
import { PersonalTrainerSchema } from '@/personalTrainer/infrastructure/PersonalTrainerCollection';
import { DataMapper } from '@/_lib/DDD';
import { PersonalTrainerIdProvider } from '@/_sharedKernel/infrastructure/PersonalTrainerIdProvider';
import { from } from 'uuid-mongodb';

const PersonalTrainerMapper: DataMapper<PersonalTrainer.Type, PersonalTrainerSchema> = {
  toData: (entity: PersonalTrainer.Type) => ({
    id: entity.id.value,
    name: entity.name,
    email: entity.email,
    password: entity.password,
    createdAt: entity.createdAt,
    updatedAt: entity.createdAt,
    version: entity.version,
  }),
  toEntity: (data: PersonalTrainerSchema) => ({
    id: PersonalTrainerIdProvider.create(from(data._id).toString()),
    name: data.name,
    email: data.email,
    password: data.password,
    createdAt: data.createdAt,
    updatedAt: data.createdAt,
    version: data.version,
  }),
};

export { PersonalTrainerMapper };
