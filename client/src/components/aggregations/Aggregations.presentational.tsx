import React from 'react';
import { CibClass } from '#/cibClass';

export interface ValueModel {
  value: string;
  valueClassName: CibClass.cibTextDanger | CibClass.cibTextMinor | '';
  containerClassName: CibClass.cibMainFontBodySemibold | CibClass.cibMainFontBodyRegular;
}

export interface AggregationsProps {
  pnl: ValueModel;
  dv01: ValueModel;
}

const ValueFieldSet: React.FC<ValueModel & { label: string }> = ({
  valueClassName,
  value,
  label,
  containerClassName,
}) => (
  <fieldset className={`${containerClassName} ${CibClass.cibPx2}`}>
    <label className={CibClass.cibPx2}>{label}</label>
    <span className={`${CibClass.cibPx1} ${valueClassName}`}>{value}</span>
  </fieldset>
);

export const AggregationsComponent: React.FC<AggregationsProps> = ({ pnl, dv01 }) => (
  <div className={CibClass.cibFlex}>
    <ValueFieldSet
      label="P/L(K) :"
      value={pnl.value}
      valueClassName={pnl.valueClassName}
      containerClassName={pnl.containerClassName}
    />
    <ValueFieldSet
      label="Dv01(K) :"
      value={dv01.value}
      valueClassName={dv01.valueClassName}
      containerClassName={dv01.containerClassName}
    />

    <span className={`${CibClass.cibMainFontBodyBold} ${CibClass.cibPx2}`}>|</span>
  </div>
);
