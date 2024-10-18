export declare type ObjectLike = Record<unknown, unknown>;
export declare type RecursivePartial<T extends ObjectLike> = {
  [P in keyof T]?: RecursivePartialField<T, P>;
};

declare type RecursivePartialField<T extends ObjectLike, P extends keyof T> = T[P] extends (infer U)[]
  ? RecursivePartialArray<U, T[P]>
  : T[P] extends ObjectLike
    ? RecursivePartial<T[P]>
    : T[P];

type RecursivePartialArray<U, T extends U[]> = U extends ObjectLike ? RecursivePartial<U>[] : T;
