import { aggregationsReducer } from './aggregations/aggregationsSlice';
import { cdrReducer } from './cdr/cdrSlice';
import { pendingEventReducer } from './pendingEvent/pendingEventSlice';
import { positionReducer } from './position/positionSlice';
import { tradeReducer } from './trade/tradeSlice';

export const dataSourcesReducer = {
  trade: tradeReducer,
  position: positionReducer,
  pendingEvent: pendingEventReducer,
  cdr: cdrReducer,
  aggregations: aggregationsReducer,
};
