import { selectors } from './rpsSelectors';
import { actions } from './rpsActions';
import { connectionsManager } from '#/connectionManager';
import { AppThunk } from './configureStore';
import { blotterThunk } from './blotters/blotterThunks';
import { gridApiManager } from '#/gridApiManager';
import { storageManager } from '#/storageManager';

function handleDataSubscriptionThunk(): AppThunk {
  return (
    dispatch,
    getState,
    { thunks: { dataEventReceivedThunk, clearEventReceivedThunk }, selectors: { selectGridKind }, connectionsManager },
  ): void => {
    const state = getState();
    const kind = selectGridKind(state.blotters.dataSources.pendingEvent);
    // connectionsManager.subscribeToGroup(kind, currentCdr);

    const wsServerUrl = `${configuration.wsServerUrl}`;
    const ws = new WebSocket(wsServerUrl);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(dataEventReceivedThunk({ ...data, kind }));
    };

    // if (kind === 'TRADE') {
    //   connectionsManager.subscribeToTrades((data) => data && dispatch(dataEventReceivedThunk({ ...data, kind })));
    // } else {
    //   connectionsManager.subscribeToPositions((data) => data && dispatch(dataEventReceivedThunk({ ...data, kind })));
    // }
    connectionsManager.subscribeToClear((data) => data && dispatch(clearEventReceivedThunk(data)));
  };
}

export const thunks = {
  handleDataSubscriptionThunk,
  ...blotterThunk,
};

export const extraArgument = {
  actions,
  thunks,
  mappers: {},
  selectors,
  connectionsManager,
  storageManager,
  gridApiManager,
};
