import { tradeAdapter } from './tradeAdapter';
import { tradeSlice } from './tradeSlice';

type State = ReturnType<typeof tradeSlice.getInitialState>;

const { selectById: selectTrade, selectAll: selectTrades } = tradeAdapter.getSelectors<{
  trade: State;
}>((state) => state.trade);

const selectTradeLastAppliedEventId: (state: { trade: State }) => number | undefined = (state) =>
  state.trade.incrementId;
const selectTradeLastRestartId: (state: { trade: State }) => number | undefined = (state) => state.trade.restartId;

export const tradeSelectors = {
  selectTrade,
  selectTrades,
  selectTradeLastAppliedEventId,
  selectTradeLastRestartId,
};
