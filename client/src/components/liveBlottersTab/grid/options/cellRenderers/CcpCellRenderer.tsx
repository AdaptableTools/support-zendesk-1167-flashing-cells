import React from 'react';
import { CibClass } from '#/cibClass';
import { ICellRendererParams } from '@ag-grid-community/core';

export const CcpCellRenderer: React.FC<ICellRendererParams> = (props) => (
  <span className={!(props.value as string | undefined)?.includes('LCH') ? CibClass.cibTextInfo : ''}>
    {props.value}
  </span>
);
