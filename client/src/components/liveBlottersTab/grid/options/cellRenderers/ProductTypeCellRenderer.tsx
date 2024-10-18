import { ICellRendererParams } from '@ag-grid-community/core';
import React from 'react';

export const ProductTypeCellRenderer: React.FC<ICellRendererParams> = (props) => {
  const text = props.value;
  const color = computeColor();

  return <cib-tag text={text} color={color} type="category" />;

  function computeColor(): CibColor {
    switch (text) {
      case 'IRFuture':
        return 'forest';
      case 'BondFuture':
        return 'accent';
      case 'Swap':
        return 'plum';
      case 'FRA':
        return 'pumpkin';
      default:
        return 'terracotta';
    }
  }
};
