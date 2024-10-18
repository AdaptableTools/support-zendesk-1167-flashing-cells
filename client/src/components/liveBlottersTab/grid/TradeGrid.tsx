import React from 'react';
import { DispatchProps } from './GridModel';
import { useDispatch } from 'react-redux';
import { thunks } from '#/business/rpsThunks';
import { Dispatch } from '#/business/configureStore';
import { TradeGridComponent } from './TradeGrid.presentational';

export const TradeGrid: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const setGridApis: DispatchProps['setGridApis'] = (adaptableApi, agGridApi) =>
    dispatch(thunks.onGridReadyThunk(adaptableApi, agGridApi));
  return <TradeGridComponent setGridApis={setGridApis} />;
};
