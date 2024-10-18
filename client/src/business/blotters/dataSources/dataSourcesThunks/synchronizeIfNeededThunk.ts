import { AppThunk } from '#/business/configureStore';

export function synchronizeIfNeededThunk(): AppThunk {
  return async (
    dispatch,
    getState,
    { thunks: { loadSnapshotThunk }, selectors: { selectCdrIsLoading, selectPendingEventIds } },
  ): Promise<void> => {
    const state = getState();
    const isLoading = selectCdrIsLoading(state);
    const noPendingEvents = !selectPendingEventIds(state.blotters.dataSources).length;

    if (isLoading || noPendingEvents) {
      return;
    }

    dispatch(loadSnapshotThunk());
  };
}
