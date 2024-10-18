import { createEntityAdapter } from '@reduxjs/toolkit';
import { Trade } from './tradeModel';

export const tradeAdapter = createEntityAdapter<Trade, string>({
  selectId: (trade) => trade.key,
});
