import React from 'react';
import { DispatchProps } from './GridModel';
import { useDispatch } from 'react-redux';
import { thunks } from '#/business/rpsThunks';
import { Dispatch } from '#/business/configureStore';
import { PositionGridComponent } from './PositionGrid.presentational';

export const PositionGrid: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const setGridApis: DispatchProps['setGridApis'] = (adaptableApi, agGridApi) =>
    dispatch(thunks.onGridReadyThunk(adaptableApi, agGridApi));
  return <PositionGridComponent setGridApis={setGridApis} />;
};
