import { AppThunk } from '#/business/configureStore';
import { defaultStore } from '#/storageManager';
import { Cdr } from './cdrModel';

function switchCdrThunk({ newCdr, oldCdr }: { newCdr: Cdr; oldCdr: Cdr }): AppThunk {
  return (
    dispatch,
    getState,
    {
      actions: { selectedCdrChanged },
      selectors: { selectGridKind },
      connectionsManager,
      storageManager: { cdrStorage },
    },
  ): void => {
    const state = getState();
    const kind = selectGridKind(state.blotters.dataSources.pendingEvent);
    connectionsManager.unsubscribeFromGroup(kind, oldCdr);
    dispatch(selectedCdrChanged(newCdr));
    cdrStorage.set(newCdr);
    connectionsManager.subscribeToGroup(kind, newCdr);
  };
}

function loadStoredCdrThunk(): AppThunk {
  return async (
    dispatch,
    _getState,
    { actions: { selectedCdrChanged }, storageManager: { cdrStorage } },
  ): Promise<void> => {
    const storedCdr = cdrStorage.get() ?? defaultStore.cdr;
    dispatch(selectedCdrChanged(storedCdr));
  };
}

function loadStoredBooksThunk(): AppThunk {
  return async (
    dispatch,
    _getState,
    { actions: { setSelectedBooks }, storageManager: { booksStorage } },
  ): Promise<void> => {
    const storedBooks = booksStorage.get() ?? defaultStore.books;
    dispatch(setSelectedBooks(storedBooks));
  };
}

export const cdrThunks = { switchCdrThunk, loadStoredCdrThunk, loadStoredBooksThunk };
