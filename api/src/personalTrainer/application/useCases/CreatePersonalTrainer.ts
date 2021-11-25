import { PersonalTrainerRepository } from '@/personalTrainer/domain/PersonalTrainerRepository';
import { PersonalTrainer } from '@/personalTrainer/domain/PersonalTrainer';
import { ApplicationService } from '@/_lib/DDD';
import { PersonalTrainerCreatedEvent } from '@/personalTrainer/application/events/PersonalTrainerCreatedEvent';
import { eventProvider } from '@/_lib/pubSub/EventEmitterProvider';

type Dependencies = {
  personalTrainerRepository: PersonalTrainerRepository;
};

type CreatePersonalTrainerDTO = {
  name: string;
  email: string;
  password: string;
};

type CreatePersonalTrainer = ApplicationService<CreatePersonalTrainerDTO, string>;

const makeCreatePersonalTrainer = eventProvider<Dependencies, CreatePersonalTrainer>(
  ({ personalTrainerRepository }, enqueue) =>
    async (payload: CreatePersonalTrainerDTO) => {
      const id = await personalTrainerRepository.getNextId();

      const personalTrainer = PersonalTrainer.create({
        id,
        name: payload.name,
        email: payload.email,
        password: payload.password
      });

      await personalTrainerRepository.store(personalTrainer);

      enqueue(PersonalTrainerCreatedEvent.create(personalTrainer));

      return id.value;
    }
);

export { makeCreatePersonalTrainer };
export type { CreatePersonalTrainer };
