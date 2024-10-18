const storageKeys = ['cdr', 'books'] as const;

export type StorageKey = (typeof storageKeys)[number];

export type GenericStorageManager<T> = {
  get: () => T | undefined;
  set: (value: T | undefined) => void;
};
