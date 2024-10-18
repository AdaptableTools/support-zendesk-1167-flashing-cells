import { GridApi, GridReadyEvent } from '@ag-grid-community/core';
import React from 'react';

type GridContextType = {
  gridApi: GridApi | null;
  setGridApis: ({ api }: GridReadyEvent) => void;
};

export const GridContext = React.createContext<GridContextType>({
  gridApi: null,
  setGridApis: () => void 0,
});
