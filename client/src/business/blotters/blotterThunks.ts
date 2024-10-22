import { AppThunk } from '#/business/configureStore';
import { AdaptableApi } from '@adaptabletools/adaptable-react-aggrid';
import { dataSourcesThunk } from './dataSources/dataSourcesThunks';
import { GridApi } from '@ag-grid-community/core';

function onGridReadyThunk(adaptableApi: AdaptableApi, agGridApi: GridApi): AppThunk {
  return async (
    dispatch,
    getState,
    {
      actions: { removeAllTrades, removeAllPositions },
      thunks: { applyAndUpdatePendingEventsThunk },
      selectors: { selectTrades, selectPositions, selectGridKind },
      gridApiManager,
    },
  ): Promise<void> => {
    const state = getState();
    const kind = selectGridKind(state.blotters.dataSources.pendingEvent);
    const [selectData, removeAllData] =
      kind === 'TRADE' ? [selectTrades, removeAllTrades] : [selectPositions, removeAllPositions];
    const data = selectData(state.blotters.dataSources);
    adaptableApi.gridApi.loadGridData(data);
    gridApiManager.setAdaptableApi(adaptableApi);
    gridApiManager.setAgGridApi(agGridApi);
    dispatch(removeAllData());
    dispatch(removeAllData());
    dispatch(applyAndUpdatePendingEventsThunk());
  };
}

export const blotterThunk = {
  onGridReadyThunk,
  ...dataSourcesThunk,
};
