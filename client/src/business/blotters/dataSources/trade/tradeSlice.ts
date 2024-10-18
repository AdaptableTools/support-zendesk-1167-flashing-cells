import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tradeAdapter } from './tradeAdapter';
import { EventId } from '#/business/rpsModel';

export const tradeSlice = createSlice({
  name: 'TRADES',
  reducers: {
    upsertTrades: tradeAdapter.upsertMany,
    updateTrades: tradeAdapter.updateMany,
    removeTrades: tradeAdapter.removeMany,
    removeAllTrades: tradeAdapter.removeAll,
    updateTradeLastAppliedEventId: (state, action: PayloadAction<Pick<EventId, 'incrementId'>>) => ({
      ...state,
      ...action.payload,
    }),
    updateTradeRestartId: (state, action: PayloadAction<Pick<EventId, 'restartId'>>) => ({
      ...state,
      ...action.payload,
    }),
  },
  initialState: tradeAdapter.getInitialState<{ [k in keyof EventId]: EventId[k] | undefined }>({
    incrementId: undefined,
    restartId: undefined,
  }),
});

export const tradeActions = tradeSlice.actions;
export const tradeReducer = tradeSlice.reducer;
