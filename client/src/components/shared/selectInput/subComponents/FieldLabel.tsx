import { CibClass } from '#/cibClass';
import React from 'react';

export const FieldLabel: React.FC<{ fieldLabel: string | undefined }> = ({ fieldLabel }) =>
  fieldLabel ? (
    <div
      data-v-ad3c5fac=""
      data-v-56b8de18=""
      className={`${CibClass.cibFlex} ${CibClass.cibJustifyBetween} ${CibClass.cibItemsEnd}`}
      color="var(--cib-color-primary)"
    >
      <div data-v-ad3c5fac="" className={`${CibClass.cibFlex} ${CibClass.cibItemsCenter} ${CibClass.cibPb1}`}>
        <div data-v-2ade674c="" data-v-ad3c5fac="" className={`${CibClass.cibFlex} ${CibClass.cibItemsCenter}`}>
          <label
            data-v-2ade674c=""
            className={`${CibClass.cibFontSemibold} ${CibClass.cibTextBase} ${CibClass.cibFirstLetterCapitalized} ${CibClass.cibH6} ${CibClass.cibOverflowHidden} ${CibClass.cibTextGray700}`}
          >
            {fieldLabel}
          </label>
        </div>
      </div>
    </div>
  ) : null;
