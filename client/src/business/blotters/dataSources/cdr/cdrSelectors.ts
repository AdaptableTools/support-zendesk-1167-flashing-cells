import { RootState } from '#/business/configureStore';
import { Cdr } from './cdrModel';

const selectCdr: (state: RootState) => Cdr = (state) => state.blotters.dataSources.cdr.selected;
const selectBooks: (state: RootState) => string[] = (state) => state.blotters.dataSources.cdr.selectedBooks;
const selectCdrIsLoading: (state: RootState) => boolean = (state) => state.blotters.dataSources.cdr.isLoading;

export const cdrSelectors = {
  selectCdr,
  selectBooks,
  selectCdrIsLoading,
};
