import { Cdr } from '#/business/rpsModel';
import React, { useState } from 'react';
import { BooksFilterModal } from './booksFilterModal/BooksFilterModal';

export interface ModelProps {
  selectedCdr: Cdr;
  selectedBooks: string;
  disabled: boolean;
}

export const BooksFilterComponent: React.FC<ModelProps> = ({ selectedCdr, selectedBooks, disabled }) => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  return (
    <>
      <cib-button
        class="button-inline"
        small
        outlined
        text={`${selectedCdr}: ${selectedBooks}`}
        onClick={() => setDisplayModal(true)}
        disabled={disabled}
      />
      {displayModal ? <BooksFilterModal onCloseModal={() => setDisplayModal(false)} /> : null}
    </>
  );
};
