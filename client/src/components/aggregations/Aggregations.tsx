import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '#/business/configureStore';
import { selectors } from '#/business/rpsSelectors';
import { AggregationsProps, AggregationsComponent, ValueModel } from './Aggregations.presentational';
import { CibClass } from '#/cibClass';

function getFormatAndClassNames(
  value: number,
  containerClassName: ValueModel['containerClassName'] = CibClass.cibMainFontBodyRegular,
  valueDefaultClassName: ValueModel['valueClassName'] = CibClass.cibTextMinor,
): ValueModel {
  return {
    value: Math.round(value).toLocaleString('en-US'),
    valueClassName: value < 0 ? CibClass.cibTextDanger : valueDefaultClassName,
    containerClassName,
  };
}

const selectAggregationsProps = createSelector(
  [selectors.selectAggregations],
  ({ pnl, dv01 }): AggregationsProps => ({
    pnl: getFormatAndClassNames(pnl, CibClass.cibMainFontBodySemibold, ''),
    dv01: getFormatAndClassNames(dv01, CibClass.cibMainFontBodySemibold, ''),
  }),
);

export const Aggregations: React.FC = () => {
  const props = useSelector<RootState, AggregationsProps>(selectAggregationsProps);

  return <AggregationsComponent {...props} />;
};
