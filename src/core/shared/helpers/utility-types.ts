export type OmitBase<T, Base> = Omit<T, keyof Base>;

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
