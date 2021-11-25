import { messageSource } from '@/_lib/message/MessageBundle';

type PersonalTrainerMessages = {
  personalTrainer: {
    error: {
      notFound: { id: string };
    };
    created: { id: string };
  };
};

const personalTrainerMessages = messageSource<PersonalTrainerMessages>({
  personalTrainer: {
    error: {
      notFound: "Can't find personal trainer #({{ id }})",
    },
    created: 'Personal trainer created with id #({{ id }})',
  },
});

export { personalTrainerMessages };
export type { PersonalTrainerMessages };
