import { format } from 'date-fns-tz';
import { parseISO } from 'date-fns';
import { ValueFormatterParams } from '@ag-grid-community/core';

export const digitsNumberFormatter = (max: number, min = 0): string => `value?.toLocaleString('en-US', {
    minimumFractionDigits: ${min},
    maximumFractionDigits: ${max},
  })`;

export const dateFilterComparator = (filterDate: Date, cellValueDateTime: string | undefined) => {
  if (!cellValueDateTime) {
    return -1;
  }

  const cellDate = parseISO(cellValueDateTime);

  if (format(cellDate, 'yyyyMMdd') === format(filterDate, 'yyyyMMdd')) {
    return 0;
  }

  return cellDate < filterDate ? -1 : 1;
};

export const dateSortComparator = (cell1Value: string | undefined, cell2Value: string) => {
  if (!cell1Value) {
    return -1;
  }

  const cell1Date = parseISO(cell1Value);
  const cell2Date = parseISO(cell2Value);

  if (cell1Date.getTime() === cell2Date.getTime()) {
    return 0;
  }

  return cell1Date < cell2Date ? -1 : 1;
};

export const booleanFormatter =
  (isfilterValuesFormatter: boolean) =>
  (params: ValueFormatterParams): string => {
    switch (params.value) {
      case true:
        return 'Y';
      case false:
        return 'N';
      case null:
      case undefined:
        return isfilterValuesFormatter ? '(Blanks)' : '';
      default:
        return params.value.toString();
    }
  };

export const tenorSortComparator = (cell1Value: string, cell2Value: string) => {
  const tenorPattern = /^(\d+)Y$/;
  const cell1Years = cell1Value?.match(tenorPattern) ?? undefined;
  const cell2Years = cell2Value?.match(tenorPattern) ?? undefined;

  if (cell1Years === undefined) {
    return -1;
  }
  if (cell2Years === undefined) {
    return 1;
  }
  return Number(cell1Years[1]) - Number(cell2Years[1]);
};
