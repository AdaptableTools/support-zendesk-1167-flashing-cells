import { dispatch } from './business/configureStore';
import { actions } from './business/rpsActions';
import { GridKind } from './business/rpsModel';
import { thunks } from './business/rpsThunks';

export function bootstrap(kind: GridKind): void {
  dispatch(actions.setGridKind(kind));
  dispatch(thunks.loadStoredCdrThunk());
  dispatch(thunks.loadStoredBooksThunk());
  dispatch(thunks.handleDataSubscriptionThunk());
  dispatch(thunks.loadSnapshotThunk());
}
