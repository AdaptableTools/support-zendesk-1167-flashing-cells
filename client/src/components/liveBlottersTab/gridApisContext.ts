// import { GridReadyEvent } from '@ag-grid-community/core';
import { AdaptableApi } from '@adaptabletools/adaptable-react-aggrid';
import React from 'react';

export class GridApisContextManager {
  #gridApisMap: { [gridId: string]: Pick<AdaptableApi, 'gridApi' | 'columnApi'> } = {};

  getGridApi(gridId: string): Pick<AdaptableApi, 'gridApi' | 'columnApi'> {
    return { ...this.#gridApisMap[gridId] };
  }

  setGridApis(gridId: string, params: Pick<AdaptableApi, 'gridApi' | 'columnApi'>): void {
    this.#gridApisMap[gridId] = params;
  }

  removeGridApis(gridId: string): void {
    delete this.#gridApisMap[gridId];
  }
}

export const gridApisContext = React.createContext<GridApisContextManager | null>(null);
