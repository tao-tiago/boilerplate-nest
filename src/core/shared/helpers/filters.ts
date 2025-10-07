/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const filters = (query: any): any => {
  const { orderBy: ob, order: o, page: p, size: s, ...f } = query;

  const orderBy = ob?.toString() ?? 'createdAt';
  const order = (o as 'asc' | 'desc') || 'desc';
  const page = parseInt(p?.toString() ?? '1');
  const size = parseInt(s?.toString() ?? '10');

  const skip = (page - 1) * size;
  const take = size;
  const filter = f as { [key: string]: string };

  return {
    orderBy,
    order,
    skip,
    take,
    filter,
  };
};
