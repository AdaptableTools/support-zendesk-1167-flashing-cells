import { EventId } from '#/business/rpsModel';

export type Position = {
  book: string;
  cdr: string;
  instrumentDescription: string;
  key: string;
  maturityDate: string;
  deliveryDate: string;
  type: string;
  group: string;
  country: string;
  isinCode: string;
  cheapestToDeliver: string;
  livePosition: number;
  codPosition: number;
  sodPosition: number;
  marketPrice: number;
  closingPrice: number;
};

export type PositionsSnapshot = { positions: Position[] } & EventId;

export type PositionToRemove = Pick<Position, 'key'>;

export type PositionToUpdate = PositionToRemove & Partial<Position>;
