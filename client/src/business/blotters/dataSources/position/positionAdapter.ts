import { createEntityAdapter } from '@reduxjs/toolkit';
import { Position } from './positionModel';

export const positionAdapter = createEntityAdapter<Position, string>({
  selectId: (position) => position.key,
});
