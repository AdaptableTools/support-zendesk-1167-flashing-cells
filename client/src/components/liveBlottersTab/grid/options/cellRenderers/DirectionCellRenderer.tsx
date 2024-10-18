import React from 'react';
import { CibClass } from '#/cibClass';
import { ICellRendererParams } from '@ag-grid-community/core';

export const DirectionCellRenderer: React.FC<ICellRendererParams> = (props) => (
  <span className={props.value === 'Sell' || props.value === 'Rec' ? CibClass.cibTextDanger : ''}>{props.value}</span>
);
