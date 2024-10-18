import { CibColors } from '#/cibColors';
import { AdaptableFormat, BadgeStyle, CalculatedColumnSettings } from '@adaptabletools/adaptable-react-aggrid';

export const numberDisplayFormat: (fractionDigits: number) => AdaptableFormat = (fractionDigits: number) => {
  return {
    Formatter: 'NumberFormatter',
    Options: {
      IntegerSeparator: ',',
      FractionSeparator: '.',
      FractionDigits: fractionDigits,
    },
  };
};

export const timeDisplayFormat: AdaptableFormat = {
  Formatter: 'DateFormatter',
  Options: { Pattern: 'HH:mm:ss' },
};

export const dateTimeDisplayFormat: AdaptableFormat = {
  Formatter: 'DateFormatter',
  Options: { Pattern: 'dd/MM/yyyy HH:mm:ss' },
};

const commonCalculatedColumnSettings: CalculatedColumnSettings = {
  DataType: 'String',
  Filterable: true,
  Resizable: true,
  Groupable: true,
  Sortable: true,
  Pivotable: true,
  Aggregatable: true,
};

export const numberCalculatedColumnSettings: CalculatedColumnSettings = {
  ...commonCalculatedColumnSettings,
  DataType: 'Number',
};

export const stringCalculatedColumnSettings: CalculatedColumnSettings = {
  ...commonCalculatedColumnSettings,
};

export const positiveNegativeBadgeStyle: BadgeStyle = {
  Badges: [
    {
      Style: {},
      Predicate: { PredicateId: 'Positive', Inputs: [] },
    },
    {
      Style: {},
      Predicate: { PredicateId: 'Zero', Inputs: [] },
    },
    {
      Style: { ForeColor: CibColors.danger },
      Predicate: { PredicateId: 'Negative', Inputs: [] },
    },
  ],
};

export const buySellBadgeStyle: BadgeStyle = {
  Badges: [
    {
      Style: { ForeColor: CibColors.danger },
      Predicate: { PredicateId: 'Values', Inputs: ['Sell', 'Rec'] },
    },
    {
      Style: {},
      Predicate: { PredicateId: 'ExcludeValues', Inputs: ['Sell', 'Rec'] },
    },
  ],
};
