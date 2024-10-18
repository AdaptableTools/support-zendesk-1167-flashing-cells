import { aggregationsActions } from './aggregations/aggregationsSlice';
import { cdrActions } from './cdr/cdrSlice';
import { pendingEventActions } from './pendingEvent/pendingEventSlice';
import { positionActions } from './position/positionSlice';
import { tradeActions } from './trade/tradeSlice';

export const dataSourcesActions = {
  ...tradeActions,
  ...positionActions,
  ...pendingEventActions,
  ...cdrActions,
  ...aggregationsActions,
};
