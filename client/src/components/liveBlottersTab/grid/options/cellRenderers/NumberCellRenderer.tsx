import React from 'react';
import { CibClass } from '#/cibClass';
import { ICellRendererParams } from '@ag-grid-community/core';

export const NumberCellRenderer: React.FC<ICellRendererParams> = (props) => (
  <span className={props.value < 0 ? CibClass.cibTextDanger : ''}>{props.valueFormatted}</span>
);
