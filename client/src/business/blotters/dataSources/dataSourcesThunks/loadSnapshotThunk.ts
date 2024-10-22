import { AppThunk } from '#/business/configureStore';
import { dispatchToast } from '#/business/dispatchToast';
import { dataSourcesApi } from '../dataSourcesApi';

function loadTradeSnapshotThunk(): AppThunk {
  return async (
    dispatch,
    getState,
    {
      actions: { setCdrIsLoading, upsertTrades, updateTradeLastAppliedEventId, updateTradeRestartId },
      thunks: { applyAndUpdatePendingEventsThunk },
      selectors: { selectCdr },
      gridApiManager,
    },
  ): Promise<void> => {
    try {
      const state = getState();
      const currentCdr = selectCdr(state);
      dispatch(setCdrIsLoading(true));
      const { trades, incrementId, restartId } = await dataSourcesApi.loadTradesSnapshot(currentCdr);
      dispatch(setCdrIsLoading(false));
      const adaptableApi = gridApiManager.getAdaptableApi();
      if (adaptableApi) {
        adaptableApi.gridApi.loadGridData(trades);
      } else {
        dispatch(upsertTrades(trades));
      }
      dispatch(updateTradeLastAppliedEventId({ incrementId }));
      dispatch(updateTradeRestartId({ restartId }));
      dispatch(applyAndUpdatePendingEventsThunk());
    } catch {
      dispatchToast(4, 'Failed to load trades', 'danger');
    }
  };
}

function loadPositionSnapshotThunk(): AppThunk {
  return async (
    dispatch,
    getState,
    {
      actions: { setCdrIsLoading, upsertPositions, updatePositionLastAppliedEventId, updatePositionRestartId },
      thunks: { applyAndUpdatePendingEventsThunk, checkDataSourceThunk },
      selectors: { selectCdr },
      gridApiManager,
    },
  ): Promise<void> => {
    try {
      const state = getState();
      const currentCdr = selectCdr(state);
      dispatch(setCdrIsLoading(true));
      const { positions, incrementId, restartId } = await dataSourcesApi.loadPositionsSnapshot(currentCdr);
      dispatch(setCdrIsLoading(false));
      const adaptableApi = gridApiManager.getAdaptableApi();
      if (adaptableApi) {
        adaptableApi.gridApi.loadGridData(positions);
      } else {
        dispatch(upsertPositions(positions));
      }
      dispatch(updatePositionLastAppliedEventId({ incrementId }));
      dispatch(updatePositionRestartId({ restartId }));
      dispatch(applyAndUpdatePendingEventsThunk());
      dispatch(checkDataSourceThunk());
    } catch {
      dispatchToast(4, 'Failed to load positions', 'danger');
    }
  };
}

export function loadSnapshotThunk(): AppThunk {
  return async (dispatch, getState, { selectors: { selectGridKind } }): Promise<void> => {
    const state = getState();
    dispatch(
      selectGridKind(state.blotters.dataSources.pendingEvent) === 'TRADE'
        ? loadTradeSnapshotThunk()
        : loadPositionSnapshotThunk(),
    );
  };
}
