import { EntityState } from '@reduxjs/toolkit';
import { pendingEventAdapter } from './pendingEventAdapter';
import { pendingEventSlice } from './pendingEventSlice';
import { PendingEvent } from './pendingEventModel';

type State = ReturnType<typeof pendingEventSlice.getInitialState>;

const {
  selectById: selectPendingEvent,
  selectAll: selectAllPendingEvents,
  selectIds,
} = pendingEventAdapter.getSelectors<{
  pendingEvent: State;
}>((state) => state.pendingEvent);

const selectPendingEventIds = selectIds as (state: { pendingEvent: EntityState<PendingEvent, number> }) => number[];

const selectLowestPendingEventId: (state: { pendingEvent: State }) => number | undefined = (state) =>
  selectPendingEventIds(state)?.[0];

const selectGridKind = (state: State) => state.gridKind;

export const pendingEventSelectors = {
  selectGridKind,
  selectPendingEvent,
  selectAllPendingEvents,
  selectPendingEventIds,
  selectLowestPendingEventId,
};
