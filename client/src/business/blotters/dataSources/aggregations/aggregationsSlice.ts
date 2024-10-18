import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AggregationsModel } from './aggregationsModel';

const initialState: AggregationsModel = {
  dv01: 0,
  pnl: 0,
};

const aggregationsSlice = createSlice({
  name: 'TRADE_AGGREGATIONS',
  reducers: {
    updateAggregations: (state, action: PayloadAction<Partial<AggregationsModel>>) => ({
      ...state,
      ...action.payload,
    }),
  },
  initialState,
});

export const aggregationsActions = aggregationsSlice.actions;
export const aggregationsReducer = aggregationsSlice.reducer;
