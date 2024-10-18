import { cdrThunks } from '../cdr/cdrThunks';
import { pendingEventThunks } from '../pendingEvent/pendingEventThunks';
import { cdrSwitchedThunk } from './cdrSwitchedThunk';
import { clearEventReceivedThunk } from './clearEventReceivedThunk';
import { loadSnapshotThunk } from './loadSnapshotThunk';
import { synchronizeIfNeededThunk } from './synchronizeIfNeededThunk';
import { dataEventReceivedThunk } from './dataEventReceivedThunk';
import { aggregationsThunks } from '../aggregations/aggregationsThunks';
import { booksFilterUpdatedThunk } from './booksFilterUpdatedThunk';
import { checkDataSourceThunk } from './checkDataSourceThunk';
import { dispatchNotificationThunk } from './dispatchNotificationThunk';

export const dataSourcesThunk = {
  ...aggregationsThunks,
  ...cdrThunks,
  ...pendingEventThunks,
  cdrSwitchedThunk,
  loadSnapshotThunk,
  dataEventReceivedThunk,
  clearEventReceivedThunk,
  synchronizeIfNeededThunk,
  booksFilterUpdatedThunk,
  checkDataSourceThunk,
  dispatchNotificationThunk,
};
