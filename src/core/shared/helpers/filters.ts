import { QueryOptionsDTO } from './query-options.dto';

export const filters = (query: QueryOptionsDTO): any => {
  const { orderBy, order, page, size, ...filter } = query;

  const skip = (page - 1) * size;
  const take = size;

  return {
    orderBy,
    order,
    skip,
    take,
    filter,
  };
};
