import { Entries } from '../helpers/utility-types';

export function entries<T extends object>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}
