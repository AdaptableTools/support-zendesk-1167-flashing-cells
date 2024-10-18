import { AppThunk } from '#/business/configureStore';
import { Cdr } from '../dataSourcesModel';

export function cdrSwitchedThunk(newCdr: Cdr): AppThunk {
  return (dispatch, getState, { thunks: { switchCdrThunk, loadSnapshotThunk }, selectors: { selectCdr } }): void => {
    const state = getState();
    const oldCdr = selectCdr(state);
    if (oldCdr === newCdr) {
      return;
    }

    dispatch(switchCdrThunk({ newCdr, oldCdr }));
    dispatch(loadSnapshotThunk());
  };
}
