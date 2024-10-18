import { RootState } from '#/business/configureStore';
import { AggregationsModel } from './aggregationsModel';

const selectAggregations: (state: RootState) => AggregationsModel = (state) => state.blotters.dataSources.aggregations;

export const aggregationsSelectors = {
  selectAggregations,
};
