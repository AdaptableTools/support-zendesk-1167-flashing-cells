import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { GridApi } from '@ag-grid-community/core';
import { AdaptableApi } from '@adaptabletools/adaptable-react-aggrid';

export const agGridModules = [
  ClientSideRowModelModule,
  SideBarModule,
  MenuModule,
  RangeSelectionModule,
  StatusBarModule,
  RowGroupingModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
  ClipboardModule,
  RichSelectModule,
  ExcelExportModule,
];

export type DispatchProps = {
  setGridApis: (adaptableApi: AdaptableApi, agGridApi: GridApi) => void;
};

export type GridComponentProps = DispatchProps;
