import { QueryOptionsDTO, QueryOptionsResponse } from "../helpers/query-options.dto"

export function filters<T extends object>(query: QueryOptionsDTO): QueryOptionsResponse<T> {
  const { orderBy, order, page, size, ...f } = query

  const skip = (page - 1) * size
  const take = size
  const filter = Object.entries(f as Record<string, string | undefined>).reduce(
    (acc, [key, val]) => {
      if (val !== undefined) {
        acc[key] = val
      }
      return acc
    },
    {} as Record<keyof T, string>
  )

  return {
    orderBy,
    order,
    skip,
    take,
    filter
  }
}
