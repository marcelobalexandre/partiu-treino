import { CreatePersonalTrainer } from '@/personalTrainer/application/useCases/CreatePersonalTrainer';
import { makeValidator } from '@/_lib/http/validation/Validator';
import { handler } from '@/_lib/http/handler';
import { Request, Response } from 'express';
import Joi from 'types-joi';
import { HttpStatus } from '@/_lib/http/HttpStatus';

type Dependencies = {
  createPersonalTrainer: CreatePersonalTrainer;
};

const { getBody } = makeValidator({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  }).required(),
});

const createPersonalTrainerHandler = handler(({ createPersonalTrainer }: Dependencies) => async (req: Request, res: Response) => {
  const { name, email, password } = getBody(req);

  const personalTrainerId = await createPersonalTrainer({ name, email, password });

  res.status(HttpStatus.CREATED).json({ id: personalTrainerId });
});

export { createPersonalTrainerHandler };
