import { combineReducers } from '@reduxjs/toolkit';
import { dataSourcesReducer } from './dataSources/dataSourcesReducer';

export const blottersReducer = {
  dataSources: combineReducers(dataSourcesReducer),
};
