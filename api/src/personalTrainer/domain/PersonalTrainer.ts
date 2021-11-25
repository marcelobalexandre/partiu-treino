import { AggregateRoot } from '@/_lib/DDD';
import { makeWithInvariants } from '@/_lib/WithInvariants';
import { PersonalTrainerId } from '@/_sharedKernel/domain/PersonalTrainerId';

namespace PersonalTrainer {
  type PersonalTrainer = AggregateRoot<PersonalTrainerId> &
    Readonly<{
      name: string;
      email: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
      version: number;
    }>;

  const withInvariants = makeWithInvariants<PersonalTrainer>((self, assert) => {
    assert(self.name?.length > 0);
    assert(self.email?.length > 0);
    assert(self.password?.length > 0);
  });

  type PersonalTrainerProps = Readonly<{
    id: PersonalTrainerId;
    name: string;
    email: string;
    password: string;
  }>;

  export const create = withInvariants(
    (props: PersonalTrainerProps): PersonalTrainer => ({
      id: props.id,
      name: props.name,
      email: props.email,
      password: props.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 0,
    })
  );

  export type Type = PersonalTrainer;
}

export { PersonalTrainer };
