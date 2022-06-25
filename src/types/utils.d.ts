export type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<NestedPartial<R>>
    : NestedPartial<T[K]>;
};

export type NestedRequired<T> = {
  [K in keyof T]-?: T[K] extends Array<infer R>
    ? Array<NestedRequired<R>>
    : NestedRequired<T[K]>;
};

export type PartiallyPartial<T, K extends keyof T> = Required<Pick<T, K>> &
  NestedPartial<T>;
