import { PaginatedQuery, PaginatedQueryResult, QueryHandler, QueryResult, SortedPaginatedQuery } from '@/_lib/CQRS';

type PersonalTrainerListItemDTO = Readonly<{
  id: string;
  name: string;
  email: string;
  password: string;
}>;

type PersonalTrainerFilter = {
  name?: string;
};

type FindPersonalTrainers = QueryHandler<SortedPaginatedQuery<PersonalTrainerFilter>, PaginatedQueryResult<PersonalTrainerListItemDTO[]>>;

export { FindPersonalTrainers };
