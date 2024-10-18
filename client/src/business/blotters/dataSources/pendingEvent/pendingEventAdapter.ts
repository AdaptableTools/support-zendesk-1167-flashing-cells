import { createEntityAdapter } from '@reduxjs/toolkit';
import { PendingEvent } from './pendingEventModel';

export const pendingEventAdapter = createEntityAdapter<PendingEvent, number>({
  selectId: (pendingEvent) => pendingEvent.incrementId,
  sortComparer: (first, second) => first.incrementId - second.incrementId,
});
