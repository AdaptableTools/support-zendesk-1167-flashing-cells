import { CibClass } from '#/cibClass';
import React from 'react';

type Props = {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  closeValueIcon?: boolean;
  placeholder?: string;
};

export const SearchBar: React.FC<Props> = ({ value, onChange, closeValueIcon, placeholder }) => (
  <div className={`${CibClass.cibWFull}`}>
    <div
      className={`${CibClass.cibSearchbarInputDiv} ${CibClass.cibBorderSecondary} ${CibClass.cibMl_1} ${CibClass.cibMr1} ${CibClass.cibMt_1}`}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className={`${CibClass.cibInput}`}
        autoFocus
        onChange={(event) => onChange(event.target.value)}
      />
      <div className={`${CibClass.cibH_8} ${CibClass.cibFlex}`}>
        <div className={`${CibClass.cibItemsCenter} ${CibClass.cibHFull} ${CibClass.cibFlex} ${CibClass.cibFlexRow}`}>
          {closeValueIcon && value !== undefined ? (
            <div
              className={`${CibClass.cibFlex} ${CibClass.cibJustifyCenter} ${CibClass.cibItemsCenter} ${CibClass.cibHFull} ${CibClass.cibW_8} ${CibClass.cibPx3}`}
              onClick={() => onChange(undefined)}
            >
              <cib-icon name="ic_close" color="var(--${CibClass.cib-color-primary)" size={1.5}></cib-icon>
            </div>
          ) : null}
          <div className={`${CibClass.cibH6} ${CibClass.cibWPx} ${CibClass.cibBgGray_500}`}></div>
          <div
            className={`${CibClass.cibFlex} ${CibClass.cibJustifyCenter} ${CibClass.cibItemsCenter} ${CibClass.cibHFull} ${CibClass.cibW_8} ${CibClass.cibPx2}`}
          >
            <cib-icon name="ic_search" color="var(--cib-color-primary)" size={1.75}></cib-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
);
