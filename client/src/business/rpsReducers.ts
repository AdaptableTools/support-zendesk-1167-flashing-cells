import { combineReducers } from '@reduxjs/toolkit';
import { blottersReducer } from './blotters/blottersReducer';

export const rpsReducers = {
  blotters: combineReducers(blottersReducer),
};
