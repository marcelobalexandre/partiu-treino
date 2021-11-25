import { FindPersonalTrainers } from '@/personalTrainer/query/FindPersonalTrainers';
import { handler } from '@/_lib/http/handler';
import Joi from 'types-joi';
import { makePaginator } from '@/_lib/http/validation/Paginator';

type Dependencies = {
  findPersonalTrainers: FindPersonalTrainers;
};

const { getFilter, getPagination, getSorter } = makePaginator({
  filter: Joi.object({
    title: Joi.string(),
    publishedBetween: Joi.array().items(Joi.date().iso().required()).min(2).max(2),
  }),
});

const findPersonalTrainersHandler = handler(({ findPersonalTrainers }: Dependencies) => async (req, res) => {
  const filter = getFilter(req);
  const pagination = getPagination(req);
  const sort = getSorter(req);

  const personalTrainers = await findPersonalTrainers({
    filter,
    sort,
    pagination,
  });

  res.json(personalTrainers);
});

export { findPersonalTrainersHandler };
