import { AppThunk } from '#/business/configureStore';
import { TradeCalculatedColumns } from '#/business/rpsModel';

function updateAggregationsThunk(): AppThunk {
  return (
    dispatch,
    getState,
    { actions: { updateAggregations }, selectors: { selectGridKind }, gridApiManager },
  ): void => {
    const state = getState();
    const kind = selectGridKind(state.blotters.dataSources.pendingEvent);

    if (kind === 'POSITION') {
      return;
    }
    const agGridApi = gridApiManager.getAgGridApi();

    const dv01ColId: keyof Pick<TradeCalculatedColumns, 'dv01'> = 'dv01';
    const pnlColId: keyof Pick<TradeCalculatedColumns, 'pnl'> = 'pnl';

    let dv01Sum = 0;
    let pnlSum = 0;

    agGridApi?.forEachNodeAfterFilter((node) => {
      if (!node.group) {
        dv01Sum += agGridApi.getValue(dv01ColId, node) ?? 0;
        pnlSum += agGridApi.getValue(pnlColId, node) ?? 0;
      }
    });

    dispatch(
      updateAggregations({
        dv01: dv01Sum / 1000,
        pnl: pnlSum / 1000,
      }),
    );
  };
}

export const aggregationsThunks = { updateAggregationsThunk };
