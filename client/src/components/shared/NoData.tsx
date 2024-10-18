import React from 'react';
import { CibClass } from '#/cibClass';

export const NoData: React.FC = () => (
  <div className={`${CibClass.cibGrid} ${CibClass.cibColSpanFull}`}>
    <span className={`${CibClass.cibTextWarning} ${CibClass.cibColStart5} ${CibClass.cibColSpan4} ${CibClass.cibPy6}`}>
      No data is available yet !
    </span>
  </div>
);
