import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { pendingEventAdapter } from './pendingEventAdapter';
import { GridKind } from './pendingEventModel';

export const pendingEventSlice = createSlice({
  name: 'PENDING_EVENTS',
  reducers: {
    upsertPendingEvents: pendingEventAdapter.upsertMany,
    removePendingEvents: pendingEventAdapter.removeMany,
    removeAllPendingEvents: pendingEventAdapter.removeAll,
    setGridKind: (state, action: PayloadAction<GridKind>) => ({
      ...state,
      gridKind: action.payload,
    }),
  },
  initialState: pendingEventAdapter.getInitialState({ gridKind: 'TRADE' as GridKind }),
});

export const pendingEventActions = pendingEventSlice.actions;
export const pendingEventReducer = pendingEventSlice.reducer;
