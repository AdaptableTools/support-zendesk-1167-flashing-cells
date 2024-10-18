import { CibClass } from '#/cibClass';
import React from 'react';

export const SelectOption: React.FC<{ onSelect: () => void; value: string; label: string; selected?: boolean }> = ({
  value,
  label,
  onSelect,
  selected,
}) => (
  <div
    key={value}
    data-v-56b8de18=""
    className={`${CibClass.cibCustomElementClass} ${CibClass.cibFontOpenSans}`}
    onClick={onSelect}
  >
    <li
      data-v-3e48adee=""
      aria-label="one"
      className={`${CibClass.cibSelectLi} ${selected ? CibClass.cibTextPrimary : CibClass.cibTextGray700}`}
    >
      <div data-v-3e48adee="">
        <div data-v-3e48adee="" className={`${CibClass.cibFirstLetterCapitalized}`}>
          <span data-v-3e48adee="">{label}</span>
        </div>
      </div>
    </li>
  </div>
);
