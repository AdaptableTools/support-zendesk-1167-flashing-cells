import React, { useEffect, useState } from 'react';
import { OutsideClickAction } from '../OutsideClickAction';
import { FieldLabel, SearchBar, SelectOption, SelectWrapper } from './subComponents';
import { CibClass } from '#/cibClass';

export type DropDownOptionType = {
  value: string;
  label: string;
};
type SelectInputProps = {
  fieldLabel?: string;
  onChange: (value: string) => void;
  options: DropDownOptionType[];
  selectedValue: string | undefined;
  placeholder?: string;
  searchBar?: boolean;
  searchBarPlaceholder?: string;
  className?: string;
  disabled?: boolean;
};

export const SelectInput: React.FC<SelectInputProps> = ({
  fieldLabel,
  selectedValue,
  options,
  placeholder,
  searchBar,
  searchBarPlaceholder,
  className,
  disabled,
  onChange,
}) => {
  const [displayOptions, setDisplayOptions] = useState<boolean>(false);
  const selectedOptionLabel = options.find(({ value }) => value === selectedValue)?.label ?? placeholder;

  const [optionFilter, setOptionFilter] = useState<string | undefined>(undefined);
  const [filteredOptions, setFilteredOptions] = useState<DropDownOptionType[]>(options);

  useEffect(() => {
    setFilteredOptions(
      optionFilter === undefined ? [...options] : options.filter(({ label }) => label.includes(optionFilter)),
    );
  }, [optionFilter, options]);
  return (
    <OutsideClickAction onClickOutSide={() => setDisplayOptions(false)}>
      <div
        className={`${CibClass.cibWFull} ${CibClass.cibCustomElementClass} ${CibClass.cibFontOpenSans} ${className}`}
      >
        <div
          data-v-56b8de18=""
          data-testid="select"
          className={`${CibClass.cibSelectContainer} ${CibClass.cibFirstLetterCapitalized} ${CibClass.cibMinW}${
            disabled ? ' rps-input-disabled' : ''
          }`}
        >
          <FieldLabel fieldLabel={fieldLabel} />
          <SelectWrapper
            selected={selectedOptionLabel}
            optionsDisplayed={displayOptions}
            onClick={() => setDisplayOptions(!displayOptions)}
            disabled={disabled ?? false}
          />
          {displayOptions ? (
            <div data-v-56b8de18="" id="myLabel" className={`${CibClass.cibSelectDropdown}`}>
              {searchBar ? (
                <SearchBar
                  value={optionFilter}
                  onChange={(value) => setOptionFilter(value)}
                  placeholder={searchBarPlaceholder}
                />
              ) : null}
              <div
                data-v-56b8de18=""
                className={`${CibClass.cibScrollbar} ${CibClass.cibOverflowYAuto} ${CibClass.cibWFull} ${CibClass.cibMaxH_41}`}
              >
                <div
                  data-v-56b8de18=""
                  className={`${CibClass.cibFlex} ${CibClass.cibFlexCol} ${CibClass.cibWFitContent} ${CibClass.cibMinWFull}`}
                >
                  <ul
                    data-v-56b8de18=""
                    data-options="inputOptions"
                    className={`${CibClass.cibSelectUlDropdown} ${CibClass.cibFlex} ${CibClass.cibFlexCol} ${CibClass.cibWFull}`}
                  >
                    {filteredOptions.map(({ value, label }) => (
                      <SelectOption
                        key={value}
                        label={label}
                        value={value}
                        selected={value === selectedValue}
                        onSelect={() => {
                          setDisplayOptions(false);
                          onChange(value);
                        }}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </OutsideClickAction>
  );
};
