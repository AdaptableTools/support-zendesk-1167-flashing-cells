import { AppThunk } from '#/business/configureStore';
import { PendingEvent } from '../dataSourcesModel';

export function clearEventReceivedThunk({
  incrementId,
  restartId,
}: Pick<PendingEvent, 'incrementId' | 'restartId'>): AppThunk {
  return (
    dispatch,
    getState,
    {
      actions: {
        updateTradeLastAppliedEventId,
        updatePositionLastAppliedEventId,
        updateTradeRestartId,
        updatePositionRestartId,
        removeAllTrades,
        removeAllPositions,
      },
      thunks: { applyAndUpdatePendingEventsThunk },
      selectors: { selectTradeLastRestartId, selectPositionLastRestartId, selectGridKind },
      gridApiManager,
    },
  ): void => {
    const state = getState();
    const kind = selectGridKind(state.blotters.dataSources.pendingEvent);

    const [selectLastRestartId, updateLastAppliedEventId, updateRestartId, removeAll] =
      kind === 'TRADE'
        ? [selectTradeLastRestartId, updateTradeLastAppliedEventId, updateTradeRestartId, removeAllTrades]
        : [selectPositionLastRestartId, updatePositionLastAppliedEventId, updatePositionRestartId, removeAllPositions];
    if ((selectLastRestartId(state.blotters.dataSources) ?? 0) >= restartId) {
      return;
    }
    const adaptableApi = gridApiManager.getAdaptableApi();
    adaptableApi?.gridApi.resetGridData([]);
    dispatch(removeAll());
    dispatch(updateLastAppliedEventId({ incrementId }));
    dispatch(updateRestartId({ restartId }));
    dispatch(applyAndUpdatePendingEventsThunk());
  };
}
