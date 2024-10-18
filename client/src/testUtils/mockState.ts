import { RootState } from '#/business/configureStore';
import { RecursivePartial } from '#/local.types';
import { isObject } from '#/type-utils';
import { isEmpty } from 'lodash';

export const initialState: RootState = {
  blotters: {
    dataSources: {
      trade: { entities: {}, ids: [], incrementId: undefined, restartId: undefined },
      position: { entities: {}, ids: [], incrementId: undefined, restartId: undefined },
      pendingEvent: { entities: {}, ids: [], gridKind: 'TRADE' },
      aggregations: { pnl: 0, dv01: 0 },
      cdr: { selected: '99999', isLoading: false, selectedBooks: [] },
    },
  },
};

export const mockState = (state: RecursivePartial<RootState> = {}): RootState => {
  return recursiveMock(state, initialState);
};

function recursiveMock<T extends Record<string, unknown>>(partialObject: RecursivePartial<T>, defaultObject: T): T {
  const objectKeys: Array<keyof T> = Object.keys(defaultObject);
  return objectKeys.reduce(
    (prev: RecursivePartial<T>, key): RecursivePartial<T> => ({
      ...prev,
      [key]: getKeyMock<T, typeof key>(partialObject, defaultObject, key),
    }),
    {} as RecursivePartial<T>,
  ) as T;
}

function getKeyMock<T extends Record<string, unknown>, K extends keyof T>(
  partialObject: RecursivePartial<T>,
  defaultObject: T,
  key: K,
): T[K] | RecursivePartial<T>[K] {
  const defaultValue = defaultObject[key];
  const partialValue = partialObject[key];

  if (partialValue === undefined || partialValue === null) {
    return defaultValue;
  }

  return isObject(defaultValue) && !isEmpty(defaultValue)
    ? recursiveMock(partialValue as RecursivePartial<T[K] & Record<string, unknown>>, defaultValue)
    : partialValue;
}
