import { PersonalTrainer } from '@/personalTrainer/domain/PersonalTrainer';
import { Repository } from '@/_lib/DDD';

type PersonalTrainerRepository = Repository<PersonalTrainer.Type> & {
  findById(id: string): Promise<PersonalTrainer.Type>;
};

export { PersonalTrainerRepository };
