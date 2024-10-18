import { Trade } from '#/business/rpsModel';
import { GridOptions } from '@ag-grid-community/core';

import { getInitialTradeColumnsDefinitions } from './columns';
import { gridCommonOptions } from './gridCommonOptions';

export const gridTradeOptions: GridOptions<Trade> = {
  ...gridCommonOptions,
  rowClassRules: {
    amended: (params) => params.data?.status === 'Amended',
    cancelled: (params) => params.data?.status === 'Cancelled',
    manual: (params) =>
      params.data?.manualTrade === true && params.data?.status !== 'Cancelled' && params.data?.status !== 'Amended',
  },
  columnDefs: getInitialTradeColumnsDefinitions(),
};
