import React from 'react';
import AdaptableReact, { AdaptableApi, AdaptableReadyInfo } from '@adaptabletools/adaptable-react-aggrid';
import { AgGridReact } from '@ag-grid-community/react';
import { adaptableTradeOptions, gridTradeOptions } from './options';
import { GridApi } from '@ag-grid-community/core';
import { dispatch } from '#/business/configureStore';
import { thunks } from '#/business/rpsThunks';
import { GridComponentProps, agGridModules } from './GridModel';

export const TradeGridComponent: React.FC<GridComponentProps> = ({ setGridApis }) => {
  const adaptableApiRef = React.useRef<AdaptableApi>();

  const onAdaptableReady = async (adaptableReadyInfo: AdaptableReadyInfo) => {
    const { adaptableApi, gridOptions: gridOps } = adaptableReadyInfo;
    const agGridApi = gridOps.api as GridApi;
    // save a reference to adaptable api
    adaptableApiRef.current = adaptableApi;
    setGridApis(adaptableApi, agGridApi);

    adaptableApi.eventApi.on('ColumnFilterApplied', () => {
      dispatch(thunks.updateAggregationsThunk());
    });
  };

  return (
    <div style={{ display: 'flex', flexFlow: 'column', height: '100%', width: '100%' }}>
      <AdaptableReact
        style={{ flex: 'none', width: '100%' }}
        gridOptions={gridTradeOptions}
        adaptableOptions={adaptableTradeOptions}
        onAdaptableReady={onAdaptableReady}
      />
      <div className="ag-theme-alpine" style={{ height: '100%' }} data-testid="blotter-grid">
        <AgGridReact modules={agGridModules} gridOptions={gridTradeOptions} />
      </div>
    </div>
  );
};
