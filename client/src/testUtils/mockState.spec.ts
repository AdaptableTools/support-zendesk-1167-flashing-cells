import { RootState } from '#/business/configureStore';
import { Trade } from '#/business/rpsModel';
import { initialState, mockState } from './mockState';

it('should return initial state when no state is provided', () => {
  // GIVEN + WHEN
  const actual = mockState();

  // THEN
  const expected = initialState;
  expect(actual).toEqual(expected);
});

it('should handle provided state with partial sub state', () => {
  // GIVEN + WHEN
  const actual = mockState({
    blotters: { dataSources: { trade: { entities: { id1: { key: 'id1' } } } } },
  });

  // THEN
  const expected: RootState = {
    ...initialState,
    blotters: {
      ...initialState.blotters,
      dataSources: {
        ...initialState.blotters.dataSources,
        trade: {
          ...initialState.blotters.dataSources.trade,
          entities: { id1: { key: 'id1' } as Trade },
        },
      },
    },
  };
  expect(actual).toEqual(expected);
});
