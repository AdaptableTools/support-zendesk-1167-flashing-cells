import { GridOptions } from '@ag-grid-community/core';

export const getDefaultColumnDefinition = (): GridOptions['defaultColDef'] => ({
  sortable: true,
  filter: true,
  floatingFilter: true,
  enableRowGroup: true,
  resizable: true,
  enablePivot: true,
  enableValue: true,
  width: 110,
  columnGroupShow: 'open',
  type: 'abColDefString',
});
