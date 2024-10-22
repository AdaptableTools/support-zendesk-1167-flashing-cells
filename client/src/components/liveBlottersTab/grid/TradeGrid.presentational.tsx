import React from 'react';
import { Adaptable, AdaptableApi, AdaptableReadyInfo } from '@adaptabletools/adaptable-react-aggrid';
import { adaptableTradeOptions, gridTradeOptions } from './options';
import { dispatch } from '#/business/configureStore';
import { thunks } from '#/business/rpsThunks';
import { agGridModules, GridComponentProps } from './GridModel';

export const TradeGridComponent: React.FC<GridComponentProps> = ({ setGridApis }) => {
  const adaptableApiRef = React.useRef<AdaptableApi>();

  const onAdaptableReady = async (adaptableReadyInfo: AdaptableReadyInfo) => {
    const { adaptableApi, agGridApi } = adaptableReadyInfo;
    // save a reference to adaptable api
    adaptableApiRef.current = adaptableApi;
    setGridApis(adaptableApi, agGridApi);

    adaptableApi.eventApi.on('ColumnFilterApplied', () => {
      dispatch(thunks.updateAggregationsThunk());
    });
  };

  return (
    <Adaptable.Provider
      gridOptions={gridTradeOptions}
      adaptableOptions={adaptableTradeOptions}
      modules={agGridModules}
      onAdaptableReady={onAdaptableReady}
    >
      <div style={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>
        <Adaptable.UI style={{ flex: 'none' }} />
        <Adaptable.AgGridReact className="ag-theme-alpine" />
      </div>
    </Adaptable.Provider>
  );
};
