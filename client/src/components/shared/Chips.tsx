import { CibClass } from '#/cibClass';
import React from 'react';

interface OwnProps {
  label: string;
  onClosed: () => void;
  className?: string;
}

export const Chips: React.FC<OwnProps> = ({ label, onClosed, className }) => {
  const commonClass = `${CibClass.cibChips} ${CibClass.cibBgDisabledBold} ${CibClass.cibBgPrimary} ${CibClass.cibTextReverse} hover:${CibClass.cibBgPrimaryHover} active:${CibClass.cibBgPrimaryPressed}`;

  return (
    <button className={`${className} ${commonClass}`}>
      <span className="cib-text-base">{label}</span>

      <cib-icon
        name="ic_filled_close"
        class={CibClass.cibMl2_5}
        color="inherit"
        size={1.5}
        onClick={(event) => {
          event.stopPropagation();
          onClosed();
        }}
        no-hover
        no-active
      ></cib-icon>
    </button>
  );
};
