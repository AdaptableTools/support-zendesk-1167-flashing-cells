import {
  AdaptableOptions,
  BadgeStyle as TypeofBadgeStyle,
  FormatColumnState,
  PredefinedConfig,
} from '@adaptabletools/adaptable-react-aggrid';
import { Position } from '#/business/rpsModel';
import { adaptableCommonOptions } from './adaptableCommonOptions';
import { numberCalculatedColumnSettings, numberDisplayFormat, positiveNegativeBadgeStyle } from './utils';

const NumberColumnIds = ['livePosition,', 'codPosition,', 'sodPosition,', 'marketPrice,', 'closingPrice,'];

const applyBadgeStyle = (columnIds: string[], BadgeStyle: TypeofBadgeStyle) =>
  columnIds.map((ColumnId) => ({
    ColumnId,
    BadgeStyle,
    IncludeGroupedRows: false,
  }));

const StyledNumberColumns = applyBadgeStyle(NumberColumnIds, positiveNegativeBadgeStyle);

export const adaptablePositionOptions: AdaptableOptions<Position> = {
  ...adaptableCommonOptions,
  adaptableId: 'RPS POSITION BLOTTER',
  predefinedConfig: {
    ...(adaptableCommonOptions.predefinedConfig as PredefinedConfig),
    Layout: {
      Revision: 101,
      CurrentLayout: 'Default',
      Layouts: [
        {
          Name: 'Default',
          Columns: [
            'book',
            'country',
            'instrumentDescription',
            'maturityDate',
            'livePosition',
            'codPosition',
            'sodPosition',
            'marketPrice',
            'closingPrice',
            'priceMove',
            'isinCode',
            'group',
            'cheapestToDeliver',
          ],
          ColumnSorts: [{ ColumnId: 'maturityDate', SortOrder: 'Desc' }],
          ColumnWidthMap: {
            book: 105,
            country: 67,
            instrumentDescription: 126,
            maturityDate: 85,
            livePosition: 140,
            codPosition: 99,
            sodPosition: 100,
            marketPrice: 140,
            closingPrice: 113,
            priceMove: 110,
            isinCode: 90,
            group: 120,
            cheapestToDeliver: 110,
            type: 98,
            key: 110,
            cdr: 105,
          },
        },
        {
          Name: 'BOND',
          Columns: [
            'ag-Grid-AutoColumn',
            'instrumentDescription',
            'maturityDate',
            'isinCode',
            'livePosition',
            'codPosition',
            'sodPosition',
            'group',
            'marketPrice',
            'closingPrice',
            'priceMove',
          ],
          ColumnSorts: [{ ColumnId: 'maturityDate', SortOrder: 'Desc' }],
          ColumnWidthMap: {
            'ag-Grid-AutoColumn': 162,
            instrumentDescription: 158,
            maturityDate: 106,
            isinCode: 123,
            livePosition: 93,
            codPosition: 99,
            sodPosition: 100,
            group: 120,
            marketPrice: 107,
            closingPrice: 91,
            priceMove: 110,
            key: 110,
            cdr: 105,
            book: 105,
            deliveryDate: 110,
            country: 67,
            cheapestToDeliver: 110,
            type: 98,
          },
          RowGroupedColumns: ['book', 'country'],
          AggregationColumns: {
            livePosition: 'sum',
            codPosition: 'sum',
            sodPosition: 'sum',
          },
          PivotColumns: ['group'],
          SuppressAggFuncInHeader: true,
          ColumnFilters: [
            {
              ColumnId: 'group',
              Predicate: { PredicateId: 'Values', Inputs: ['BOND'] },
            },
          ],
        },
        {
          Name: 'FUT',
          Columns: [
            'ag-Grid-AutoColumn',
            'country',
            'instrumentDescription',
            'maturityDate',
            'livePosition',
            'codPosition',
            'sodPosition',
            'marketPrice',
            'closingPrice',
            'priceMove',
            'isinCode',
            'group',
            'cheapestToDeliver',
          ],
          ColumnSorts: [{ ColumnId: 'maturityDate', SortOrder: 'Desc' }],
          ColumnWidthMap: {
            'ag-Grid-AutoColumn': 156,
            country: 67,
            instrumentDescription: 126,
            maturityDate: 85,
            livePosition: 140,
            codPosition: 99,
            sodPosition: 100,
            marketPrice: 92,
            closingPrice: 107,
            priceMove: 75,
            isinCode: 90,
            group: 120,
            cheapestToDeliver: 110,
            key: 110,
            cdr: 105,
            book: 105,
            type: 98,
          },
          RowGroupedColumns: ['book', 'type'],
          SuppressAggFuncInHeader: true,
          ColumnFilters: [
            {
              ColumnId: 'group',
              Predicate: {
                PredicateId: 'Values',
                Inputs: ['LFUT', 'SFUT'],
              },
            },
          ],
        },
      ],
    },
    FormatColumn: {
      Revision: 101,
      FormatColumns: [
        {
          Scope: {
            ColumnIds: ['livePosition', 'codPosition', 'sodPosition'],
          },
          DisplayFormat: numberDisplayFormat(0),
          CellAlignment: 'Left',
        },
        {
          Scope: { ColumnIds: ['marketPrice', 'closingPrice', 'priceMove'] },
          Style: {},
          DisplayFormat: numberDisplayFormat(4),
          CellAlignment: 'Left',
        },
        // Combine with the FormatColumns from adaptableCommonOptions
        ...(((adaptableCommonOptions.predefinedConfig as PredefinedConfig).FormatColumn as FormatColumnState)
          .FormatColumns as []),
      ],
    },
    CalculatedColumn: {
      Revision: 100,
      CalculatedColumns: [
        {
          ColumnId: 'priceMove',
          Query: { ScalarExpression: 'SUB([marketPrice], [closingPrice])' },
          CalculatedColumnSettings: numberCalculatedColumnSettings,
          FriendlyName: 'Price Move',
        },
      ],
    },
    StyledColumn: {
      StyledColumns: [...StyledNumberColumns],
    },
  },
};
