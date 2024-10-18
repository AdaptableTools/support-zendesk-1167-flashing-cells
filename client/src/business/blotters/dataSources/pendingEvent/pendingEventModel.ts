import { Position, PositionToRemove, Trade, TradeToRemove, TradeToUpdate } from '#/business/rpsModel';

export type GridKind = 'TRADE' | 'POSITION';
export type EventId = { incrementId: number; restartId: number };
export type EventProps = { key: number; type: string };
type CommonEvent = EventId & EventProps & { cdr: string };

export type TradeEvent = CommonEvent & {
  createdTrades: Trade[];
  updatedTrades: Trade[];
  deletedTrades: TradeToRemove[];
  prices: TradeToUpdate[];
};

export type PositionEvent = CommonEvent & {
  createdPositions: Position[];
  updatedPositions: Position[];
  deletedPositions: PositionToRemove[];
};

export type PendingEvent = (TradeEvent & { kind: 'TRADE' }) | (PositionEvent & { kind: 'POSITION' });
