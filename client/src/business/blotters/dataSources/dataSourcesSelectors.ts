import { aggregationsSelectors } from './aggregations/aggregationsSelectors';
import { cdrSelectors } from './cdr/cdrSelectors';
import { pendingEventSelectors } from './pendingEvent/pendingEventSelectors';
import { positionSelectors } from './position/positionSelectors';
import { tradeSelectors } from './trade/tradeSelectors';

export const dataSourcesSelectors = {
  ...tradeSelectors,
  ...positionSelectors,
  ...pendingEventSelectors,
  ...cdrSelectors,
  ...aggregationsSelectors,
};
