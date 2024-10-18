import { GridOptions } from '@ag-grid-community/core';
import { getDefaultColumnDefinition } from './columns';
import { LicenseManager } from '@ag-grid-enterprise/core';

LicenseManager.setLicenseKey(
  'Using_this_AG_Grid_Enterprise_key_( AG-037753 )_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_( legal@ag-grid.com )___For_help_with_changing_this_key_please_contact_( info@ag-grid.com )___( CREDIT AGRICOLE CIB TRANSACTIONS )_is_granted_a_( Multiple Applications )_Developer_License_for_( 30 )_Front-End_JavaScript_developers___All_Front-End_JavaScript_developers_need_to_be_licensed_in_addition_to_the_ones_working_with_AG_Grid_Enterprise___This_key_has_been_granted_a_Deployment_License_Add-on_for_( 10 )_Production_Environments___This_key_works_with_AG_Grid_Enterprise_versions_released before_( 28 April 2024 )____[v2]_MTcxNDI1ODgwMDAwMA==b65f9af2a027967b7716ad20e93f0599',
);

export const gridCommonOptions: GridOptions = {
  getRowId: (params) => params.data.key,
  sideBar: {
    toolPanels: ['columns', 'filters', 'adaptable'],
    position: 'right',
  },
  rowGroupPanelShow: 'always',
  components: {},
  rowHeight: 20,
  headerHeight: 25,
  suppressAggFuncInHeader: true,
  groupAggFiltering: true,
  autoGroupColumnDef: {
    filter: 'agGroupColumnFilter',
  },
  enableRangeSelection: true,
  rowSelection: 'multiple',
  allowContextMenuWithControlKey: true,
  pivotRowTotals: 'before',
  pivotColumnGroupTotals: 'before',
  statusBar: {
    statusPanels: [
      { statusPanel: 'agTotalRowCountComponent', align: 'left' },
      {
        key: 'Center Panel',
        statusPanel: 'AdaptableStatusPanel',
        align: 'center',
      },
      {
        key: 'Right Panel',
        statusPanel: 'AdaptableStatusPanel',
        align: 'right',
      },
      { statusPanel: 'agFilteredRowCountComponent', align: 'right' },
    ],
  },
  defaultColDef: getDefaultColumnDefinition(),
};
