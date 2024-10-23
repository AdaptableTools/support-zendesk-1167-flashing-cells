import { AppThunk } from '#/business/configureStore';
import { PendingEvent, Trade } from '#/business/rpsModel';

function applyAndUpdatePendingEventsThunk(): AppThunk {
  return (
    dispatch,
    getState,
    {
      actions: { removePendingEvents, updateTradeLastAppliedEventId, updatePositionLastAppliedEventId },
      thunks: { synchronizeIfNeededThunk, updateAggregationsThunk },
      selectors: {
        selectGridKind,
        selectCdr,
        selectTradeLastRestartId,
        selectTradeLastAppliedEventId,
        selectPositionLastRestartId,
        selectPositionLastAppliedEventId,
        selectAllPendingEvents,
      },
      gridApiManager,
    },
  ): void => {
    const adaptableApi = gridApiManager.getAdaptableApi();
    const state = getState();
    const kind = selectGridKind(state.blotters.dataSources.pendingEvent);
    const [updateLastAppliedEventId, selectLastRestartId, selectLastAppliedEventId] =
      kind === 'TRADE'
        ? [updateTradeLastAppliedEventId, selectTradeLastRestartId, selectTradeLastAppliedEventId]
        : [updatePositionLastAppliedEventId, selectPositionLastRestartId, selectPositionLastAppliedEventId];
    const currentCdr = selectCdr(state);
    const lastRestartId = selectLastRestartId(state.blotters.dataSources);
    let lastAppliedEventId = selectLastAppliedEventId(state.blotters.dataSources);

    if (!adaptableApi || lastRestartId === undefined || lastAppliedEventId === undefined) {
      return;
    }
    const pendingEvents = selectAllPendingEvents(state.blotters.dataSources);

    let remainingPendingEventsNumber = pendingEvents.length;
    pendingEvents.forEach((pendingEvent: PendingEvent) => {
      if (
        pendingEvent.cdr !== currentCdr ||
        pendingEvent.restartId !== lastRestartId ||
        pendingEvent.incrementId <= lastAppliedEventId!
      ) {
        dispatch(removePendingEvents([pendingEvent.incrementId]));
        remainingPendingEventsNumber--;
      } else if (pendingEvent.incrementId === lastAppliedEventId! + 1) {
        lastAppliedEventId = pendingEvent.incrementId;
        const [created, updated, deleted, prices] =
          pendingEvent.kind === 'TRADE'
            ? [pendingEvent.createdTrades, pendingEvent.updatedTrades, pendingEvent.deletedTrades, pendingEvent.prices]
            : [pendingEvent.createdPositions, pendingEvent.updatedPositions, pendingEvent.deletedPositions, undefined];
        adaptableApi.gridApi.addGridData(created, { runAsync: true });
        adaptableApi.gridApi.updateGridData(updated, { runAsync: true });
        if (prices?.length) {
          const currentRowData = adaptableApi.gridApi.getGridData() as Trade[];
          // NOTE: this is a bit of a micro-optimization, but the previous O(n^2) could be a problem with large datasets
          const currentRowDataMap = new Map(currentRowData.map((rowData) => [rowData.key, rowData]));

          const pricesToUpdate = prices.map((partialPrice) => ({
            ...currentRowDataMap.get(partialPrice.key),
            ...partialPrice,
          }));
          adaptableApi.gridApi.updateGridData(pricesToUpdate, { runAsync: true });
        }
        adaptableApi.gridApi.deleteGridData(deleted, { runAsync: true });
        dispatch(removePendingEvents([pendingEvent.incrementId]));
        remainingPendingEventsNumber--;
      }
    });
    dispatch(updateLastAppliedEventId({ incrementId: lastAppliedEventId }));
    dispatch(updateAggregationsThunk());
    if (remainingPendingEventsNumber) {
      setTimeout(() => dispatch(synchronizeIfNeededThunk()), configuration.checkGridSynchronizedMilliseconds);
    }
  };
}

export const pendingEventThunks = {
  applyAndUpdatePendingEventsThunk,
};
