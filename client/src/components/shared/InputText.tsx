import React from 'react';
import { CibClass } from '#/cibClass';

type InputTextPorps = {
  name?: string;
  maxLength?: number;
  placeholder?: string;
  value?: string;
  label?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onDebouncedChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  reference?: React.LegacyRef<HTMLInputElement>;
  autoFocus?: boolean;
};

export const InputText: React.FC<InputTextPorps> = ({
  name,
  maxLength,
  placeholder,
  value,
  label,
  onChange,
  onBlur,
  reference,
  autoFocus,
}) => {
  return (
    <div>
      <div className={`${CibClass.cibFlex} ${CibClass.cibJustifyBetween} ${CibClass.cibItemsEnd}`}>
        {label ? (
          <div className={`${CibClass.cibFlex} ${CibClass.cibItemsCenter} ${CibClass.cibPb1}`}>
            <div className={`${CibClass.cibFlex} ${CibClass.cibItemsCenter}`}>
              <label
                className={`${CibClass.cibFontSemibold} ${CibClass.cibTextBase} ${CibClass.cibFirstLetterCapitalized} ${CibClass.cibH6} ${CibClass.cibOverflowHidden} ${CibClass.cibTextGray700}`}
              >
                {label}
              </label>
            </div>
          </div>
        ) : null}
      </div>
      <div
        className={`${CibClass.cibFlex} ${CibClass.cibRoundedXs} ${CibClass.cibBorderGray500} ${CibClass.cibBorder} focus-within:${CibClass.cibBorder} focus-within:${CibClass.cibBorderSecondary} ${CibClass.cibBgGray000} ${CibClass.cibPy1}`}
      >
        <input
          ref={reference}
          id={name}
          name={name}
          type="text"
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`${CibClass.cibInputText} ${CibClass.cibWFull}`}
          onChange={onChange}
          onBlur={onBlur}
          autoFocus={autoFocus}
        />
      </div>
    </div>
  );
};
