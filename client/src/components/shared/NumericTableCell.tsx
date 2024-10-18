import React from 'react';
import { CibClass } from '#/cibClass';

export const NumericTableCell: React.FC<{ value: number | undefined; precision: number; className?: string }> = ({
  value,
  precision,
  className,
}) => {
  const signClassName = value && value < 0 ? CibClass.cibTextDanger : '';

  return (
    <td>
      <div className={className}>
        <span className={signClassName}>
          {value?.toLocaleString('en-US', { maximumFractionDigits: precision }) ?? ''}
        </span>
      </div>
    </td>
  );
};
