import { CibClass } from '#/cibClass';
import React from 'react';

export const SelectWrapper: React.FC<{
  selected: string | undefined;
  onClick: () => void;
  optionsDisplayed: boolean;
  disabled: boolean;
}> = ({ selected, optionsDisplayed, disabled, onClick }) => (
  <div data-v-56b8de18="" className={`${CibClass.cibSelectWrapper} ${CibClass.cibZ_3}`} onClick={onClick}>
    <div data-v-56b8de18="" className={`${CibClass.cibSelect} ${CibClass.cibBorderSecondary}`}>
      <span
        data-v-56b8de18=""
        className={`${CibClass.cibSelectPlaceholder} ${CibClass.cibOverflowEllipsis} ${CibClass.cibOverflowHidden} ${
          CibClass.cibFirstLetterCapitalized
        } ${CibClass.cibTextGray_600}${disabled ? CibClass.cibTextDisabled + ' ' + CibClass.cibBgDisabledSubtle : ''}`}
      >
        <div data-v-56b8de18=""> {selected} </div>
      </span>

      <div
        data-v-56b8de18=""
        className={`${CibClass.cibFlex} ${CibClass.cibJustifyCenter} ${CibClass.cibItemsCenter}${
          disabled ? ' ' + CibClass.cibTextDisabled + ' ' + CibClass.cibBgDisabledSubtle : ''
        }`}
      >
        <div data-v-56b8de18="" className={`${CibClass.cibCleanSelect}`} style={{ display: 'none' }}>
          <cib-icon name="ic_close" no-hover no-active size={2}></cib-icon>
        </div>
        <div
          data-v-56b8de18=""
          className={`${CibClass.cibH_4} ${CibClass.cibWPx} ${CibClass.cibBgGray_500}`}
          style={{ display: 'none' }}
        ></div>
        <div
          data-v-56b8de18=""
          className={`${CibClass.cibPx2} ${CibClass.cibPy_1_75} ${CibClass.cibZ1} ${CibClass.cibRoundedRXs} ${CibClass.cibFlex}`}
        >
          <cib-icon name={optionsDisplayed ? 'ic_chevron_up' : 'ic_chevron_down'} size={2}></cib-icon>
        </div>
      </div>
    </div>
  </div>
);
