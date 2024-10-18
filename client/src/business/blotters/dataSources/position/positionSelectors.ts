import { positionAdapter } from './positionAdapter';
import { positionSlice } from './positionSlice';

type State = ReturnType<typeof positionSlice.getInitialState>;

const { selectById: selectPosition, selectAll: selectPositions } = positionAdapter.getSelectors<{
  position: State;
}>((state) => state.position);

const selectPositionLastAppliedEventId: (state: { position: State }) => number | undefined = (state) =>
  state.position.incrementId;
const selectPositionLastRestartId: (state: { position: State }) => number | undefined = (state) =>
  state.position.restartId;

export const positionSelectors = {
  selectPosition,
  selectPositions,
  selectPositionLastAppliedEventId,
  selectPositionLastRestartId,
};
