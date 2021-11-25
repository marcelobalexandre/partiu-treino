import { PersonalTrainer } from '@/personalTrainer/domain/PersonalTrainer';
import { Event } from '@/_lib/events/Event';
import { v4 } from 'uuid-mongodb';

namespace PersonalTrainerCreatedEvent {
  export const topic = 'PersonalTrainer' as const;
  export const eventType = 'PersonalTrainerCreatedEvent' as const;

  type PersonalTrainerCreatedEvent = Event<PersonalTrainer.Type, typeof eventType, typeof topic>;

  export const create = (personalTrainer: PersonalTrainer.Type): PersonalTrainerCreatedEvent => ({
    eventId: v4().toString(),
    eventType,
    topic,
    payload: personalTrainer,
  });

  export type Type = PersonalTrainerCreatedEvent;
}

export { PersonalTrainerCreatedEvent };
