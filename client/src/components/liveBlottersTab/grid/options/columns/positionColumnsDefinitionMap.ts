import { Position } from '#/business/rpsModel';
import { ColDef } from '@ag-grid-community/core';

export const getInitialPositionColumnsDefinitions = (): ColDef<Position>[] => [
  { field: 'key', hide: true, lockVisible: true },
  {
    field: 'cdr',
    headerName: 'CDR',
    width: 105,
    hide: true,
  },
  {
    field: 'book',
    headerName: 'Book',
    width: 105,
  },
  {
    field: 'instrumentDescription',
    headerName: 'Description',
    width: 140,
  },
  {
    type: 'abColDefDate',
    field: 'maturityDate',
    headerName: 'Maturity',
    width: 110,
  },
  {
    type: 'abColDefDate',
    field: 'deliveryDate',
    headerName: 'Delivery',
    width: 110,
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 110,
  },
  {
    field: 'isinCode',
    headerName: 'Code ISIN',
    width: 110,
  },
  {
    field: 'cheapestToDeliver',
    headerName: 'Cheapest To Deliver',
    width: 110,
  },
  {
    field: 'livePosition',
    headerName: 'Live',
    filter: 'agNumberColumnFilter',
    type: 'abColDefNumber',
    aggFunc: 'sum',
    width: 140,
  },
  {
    field: 'codPosition',
    headerName: 'COD',
    filter: 'agNumberColumnFilter',
    type: 'abColDefNumber',
    aggFunc: 'sum',
    width: 140,
  },
  {
    field: 'sodPosition',
    headerName: 'SOD',
    filter: 'agNumberColumnFilter',
    type: 'abColDefNumber',
    aggFunc: 'sum',
    width: 140,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 120,
  },
  {
    field: 'group',
    headerName: 'Group',
    width: 120,
  },
  {
    field: 'marketPrice',
    headerName: 'Market price',
    type: 'abColDefNumber',
    width: 140,
  },
  {
    field: 'closingPrice',
    headerName: 'Closing price',
    type: 'abColDefNumber',
    width: 140,
  },
];
