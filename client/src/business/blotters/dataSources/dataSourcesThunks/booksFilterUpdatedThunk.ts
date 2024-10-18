import { AppThunk } from '#/business/configureStore';
import { Book, Cdr } from '../dataSourcesModel';

export function booksFilterUpdatedThunk(newCdr: Cdr, newBooks: Array<{ book: Book; selected: boolean }>): AppThunk {
  return (
    dispatch,
    _getState,
    { thunks: { cdrSwitchedThunk }, actions: { setSelectedBooks }, storageManager: { booksStorage }, gridApiManager },
  ): void => {
    dispatch(cdrSwitchedThunk(newCdr));
    const adaptableApi = gridApiManager.getAdaptableApi();
    const selectedBooks = newBooks.filter(({ selected }) => selected);

    if (selectedBooks.length === newBooks.length) {
      adaptableApi?.columnFilterApi.clearColumnFilterForColumn('book');
      dispatch(setSelectedBooks([]));
      booksStorage.set([]);
    } else {
      const flatSelectedBooks = selectedBooks.map(({ book }) => book);
      adaptableApi?.columnFilterApi.setColumnFilters([
        { ColumnId: 'book', Predicate: { PredicateId: 'Values', Inputs: flatSelectedBooks } },
      ]);
      dispatch(setSelectedBooks(flatSelectedBooks));
      booksStorage.set(flatSelectedBooks);
    }
  };
}
