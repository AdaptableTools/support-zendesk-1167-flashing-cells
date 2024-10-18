import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { positionAdapter } from './positionAdapter';
import { EventId } from '#/business/rpsModel';

export const positionSlice = createSlice({
  name: 'POSITIONS',
  reducers: {
    upsertPositions: positionAdapter.upsertMany,
    updatePositions: positionAdapter.updateMany,
    removePositions: positionAdapter.removeMany,
    removeAllPositions: positionAdapter.removeAll,
    updatePositionLastAppliedEventId: (state, action: PayloadAction<Pick<EventId, 'incrementId'>>) => ({
      ...state,
      ...action.payload,
    }),
    updatePositionRestartId: (state, action: PayloadAction<Pick<EventId, 'restartId'>>) => ({
      ...state,
      ...action.payload,
    }),
  },
  initialState: positionAdapter.getInitialState<{ [k in keyof EventId]: EventId[k] | undefined }>({
    incrementId: undefined,
    restartId: undefined,
  }),
});

export const positionActions = positionSlice.actions;
export const positionReducer = positionSlice.reducer;
