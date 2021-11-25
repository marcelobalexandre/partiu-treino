import { makeIdProvider } from '@/_lib/IdProvider';
import { PersonalTrainerId } from '@/_sharedKernel/domain/PersonalTrainerId';

const PersonalTrainerIdProvider = makeIdProvider<PersonalTrainerId>('PersonalTrainerId');

export { PersonalTrainerIdProvider };
