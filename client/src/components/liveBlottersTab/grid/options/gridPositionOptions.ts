import { Position } from '#/business/rpsModel';
import { GridOptions } from '@ag-grid-community/core';

import { getInitialPositionColumnsDefinitions } from './columns';
import { gridCommonOptions } from './gridCommonOptions';

export const gridPositionOptions: GridOptions<Position> = {
  ...gridCommonOptions,
  columnDefs: getInitialPositionColumnsDefinitions(),
};
