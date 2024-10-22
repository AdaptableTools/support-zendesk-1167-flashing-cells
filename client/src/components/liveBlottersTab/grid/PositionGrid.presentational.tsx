import React from 'react';
import { Adaptable, AdaptableApi, AdaptableReadyInfo } from '@adaptabletools/adaptable-react-aggrid';
import { adaptablePositionOptions, gridPositionOptions } from './options';
import { GridComponentProps, agGridModules } from './GridModel';

export const PositionGridComponent: React.FC<GridComponentProps> = ({ setGridApis }) => {
  const adaptableApiRef = React.useRef<AdaptableApi>();

  const onAdaptableReady = async (adaptableReadyInfo: AdaptableReadyInfo) => {
    const { adaptableApi, agGridApi } = adaptableReadyInfo;
    // save a reference to adaptable api
    adaptableApiRef.current = adaptableApi;
    setGridApis(adaptableApi, agGridApi);
  };

  return (
    <Adaptable.Provider
      gridOptions={gridPositionOptions}
      adaptableOptions={adaptablePositionOptions}
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
