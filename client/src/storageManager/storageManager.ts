import { Book, Cdr } from '#/business/rpsModel';
import { GenericStorageManager, StorageKey } from './storageModel';

const genericStorageManager = <T>(key: StorageKey): GenericStorageManager<T> => ({
  get: (): T | undefined => {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : undefined;
  },
  set: (value: T | undefined) => {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
});

export const storageManager = {
  cdrStorage: genericStorageManager<Cdr>('cdr'),
  booksStorage: genericStorageManager<Book[]>('books'),
};

export const defaultStore: { cdr: Cdr; books: Book[] } = {
  cdr: '99999',
  books: [],
};
