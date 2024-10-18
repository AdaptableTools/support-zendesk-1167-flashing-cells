import React from 'react';
import { CibClass } from '#/cibClass';

export const TabContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={`${CibClass.cibGrid} ${CibClass.cibGridCols12} ${CibClass.cibPx1} content-h-full`}>{children}</div>
);
