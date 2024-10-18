import { AppThunk } from '#/business/configureStore';
import { PendingEvent } from '../dataSourcesModel';

export function dataEventReceivedThunk(receivedEvent: PendingEvent): AppThunk {
  return (
    dispatch,
    getState,
    {
      actions: { upsertPendingEvents },
      thunks: { loadSnapshotThunk, applyAndUpdatePendingEventsThunk },
      selectors: {
        selectTradeLastRestartId,
        selectPositionLastRestartId,
        selectCdr,
        selectTradeLastAppliedEventId,
        selectPositionLastAppliedEventId,
        selectCdrIsLoading,
        selectGridKind,
      },
    },
  ): void => {
    const state = getState();
    const kind = selectGridKind(state.blotters.dataSources.pendingEvent);

    if (kind !== receivedEvent.kind) {
      return;
    }
    const [selectLastRestartId, selectLastAppliedEventId] =
      kind === 'TRADE'
        ? [selectTradeLastRestartId, selectTradeLastAppliedEventId]
        : [selectPositionLastRestartId, selectPositionLastAppliedEventId];
    const lastRestartId = selectLastRestartId(state.blotters.dataSources) ?? 0;
    const currentCdr = selectCdr(state);
    const lastIncrementId = selectLastAppliedEventId(state.blotters.dataSources) ?? 0;

    const eventIsOutdated = (): boolean => {
      if (
        currentCdr !== receivedEvent.cdr ||
        (lastRestartId > receivedEvent.restartId && receivedEvent.restartId !== 0)
      ) {
        return true;
      }

      if (lastRestartId === receivedEvent.restartId && receivedEvent.incrementId <= lastIncrementId) {
        return true;
      }
      return false;
    };

    if (!receivedEvent || eventIsOutdated()) {
      return;
    }
    dispatch(upsertPendingEvents([receivedEvent]));

    const snapshotIsLoading = selectCdrIsLoading(state);

    if (snapshotIsLoading) {
      return;
    }

    if (lastRestartId < receivedEvent.restartId || (lastRestartId !== 0 && receivedEvent.restartId === 0)) {
      dispatch(loadSnapshotThunk());
      return;
    }

    dispatch(applyAndUpdatePendingEventsThunk());
  };
}
