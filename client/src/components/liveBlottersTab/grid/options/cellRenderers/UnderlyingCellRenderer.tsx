import React from 'react';
import { CibClass } from '#/cibClass';
import { ICellRendererParams } from '@ag-grid-community/core';

export const UnderlyingCellRenderer: React.FC<ICellRendererParams> = (props) => (
  <span className={!(props.value as string | undefined)?.includes('6M') ? CibClass.cibTextInfo : ''}>
    {props.value}
  </span>
);
