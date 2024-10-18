import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { rpsReducers } from './rpsReducers';
import { extraArgument } from './rpsThunks';

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, typeof extraArgument, Action>;

export type Dispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rpsReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }),
  devTools: configuration.enableReduxDevtools,
});

export const dispatch = store.dispatch;
