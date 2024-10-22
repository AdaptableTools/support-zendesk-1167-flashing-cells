import { parseISO } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';
import { AdaptableOptions, CustomDisplayFormatterContext } from '@adaptabletools/adaptable-react-aggrid';

export const adaptableCommonOptions: AdaptableOptions = {
  licenseKey:
    'AppName=CACIB-Trial|Owner=CACIB|StartDate=2024-03-21|EndDate=2024-04-22|Ref=AdaptableLicense|TS=1711036695278|C=3303454093,322096093,1260976079,1242644026,1322211129,829164981,2675945478',
  primaryKey: 'key',
  userName: 'rps user',
  predefinedConfig: {
    Dashboard: {
      Revision: 100,
      ModuleButtons: ['SystemStatus'],
    },
    ToolPanel: {
      Revision: 100,
      ModuleButtons: ['Layout', 'CellSummary', 'Dashboard'],
    },
    StatusBar: {
      Revision: 100,
      StatusBars: [
        {
          Key: 'Center Panel',
          StatusBarPanels: ['Layout', 'CellSummary', 'ColumnFilter'],
        },
      ],
    },
    FlashingCell: {
      FlashingCellDefinitions: [
        {
          Scope: { DataTypes: ['Number'] },
          Rule: { Predicates: [{ PredicateId: 'AnyChange' }] },
          DownChangeStyle: { BackColor: '#bb0d0d' },
          UpChangeStyle: { BackColor: '#19bb0d' },
          NeutralChangeStyle: { BackColor: '#0d24bb' },
          FlashDuration: 500,
          FlashTarget: 'cell',
        },
      ],
    },
    FormatColumn: {
      FormatColumns: [
        {
          Scope: { ColumnIds: ['maturityDate'] },
          DisplayFormat: {
            Formatter: 'DateFormatter',
            Options: { Pattern: 'MMM yyyy' },
          },
          Rule: {
            Predicates: [
              {
                PredicateId: 'Values',
                ColumnId: 'group',
                Inputs: ['LFUT', 'SFUT'],
              },
            ],
          },
          IncludeGroupedRows: true,
          CellAlignment: 'Left',
        },
        {
          Scope: { DataTypes: ['Date'] },
          Style: {},
          DisplayFormat: {
            Formatter: 'DateFormatter',
            Options: { Pattern: 'dd/MM/yyyy' },
          },
          Rule: { Predicates: [{ PredicateId: 'NonBlanks' }] },
          IncludeGroupedRows: true,
          CellAlignment: 'Left',
        },
      ],
    },
  },
  formatColumnOptions: {
    customDisplayFormatters: [
      {
        id: 'displayInUTC',
        label: 'Display in UTC',
        scope: {
          DataTypes: ['Date'],
        },
        handler: (context: CustomDisplayFormatterContext) => {
          if (!context || !context.cellValue) {
            return undefined;
          }
          const isoValue = parseISO(context.cellValue);
          const timeZone = 'UTC';
          const displayFormat = 'dd/MM/yyyy';

          return format(utcToZonedTime(isoValue, timeZone), displayFormat);
        },
      },
    ],
  },
  notificationsOptions: {
    showSystemStatusMessageNotifications: true,
    closeWhenClicked: true,
    position: 'TopRight',
    transition: 'Slide',
    duration: 5000,
  },
};
