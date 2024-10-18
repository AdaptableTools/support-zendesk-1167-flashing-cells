import { Book, Cdr } from '#/business/rpsModel';
import { CibClass } from '#/cibClass';
import { Modal, SelectInput } from '#/components/shared';
import { Chips } from '#/components/shared/Chips';
import { ComponentWrapper } from '#/components/shared/ComponentWrapper';
import React, { useEffect, useState } from 'react';

type BookBlock = { book: Book; selected: boolean };
export interface OwnProps {
  onCloseModal: () => void;
}

export interface ModelProps {
  selectedCdr: Cdr;
  currentBooks: BookBlock[];
  availableCdrs: Array<{ value: Cdr; label: Cdr }>;
  availableCdrWithBooks: { [k in Cdr]: BookBlock[] };
}

export interface DispatchProps {
  onBooksFilterValidated: (cdr: Cdr, books: BookBlock[]) => void;
}

export const BooksFilterModalComponent: React.FC<OwnProps & DispatchProps & ModelProps> = ({
  selectedCdr,
  currentBooks,
  availableCdrs,
  availableCdrWithBooks,
  onBooksFilterValidated,
  onCloseModal,
}) => {
  const [cdr, setCdr] = useState<Cdr>(selectedCdr);
  const [books, setBooks] = useState<BookBlock[]>(currentBooks);
  const [validationDisabled, setValidationDisabled] = useState<boolean>(false);
  const [allSelected, setAllSelected] = useState<boolean>(!currentBooks.find(({ selected }) => !selected));

  const onCdrChanged = (cdr: Cdr) => {
    setCdr(cdr);
    setBooks(availableCdrWithBooks[cdr]);
  };

  const onClickOnBook = (targetBook: string) => {
    setBooks(
      books.map(({ book, selected }) => (book === targetBook ? { book, selected: !selected } : { book, selected })),
    );
  };

  const onClickUnselectBook = (targetBook: string) => {
    setBooks(books.map(({ book, selected }) => (book === targetBook ? { book, selected: false } : { book, selected })));
  };

  const onClickOnALL = () => {
    setBooks(books.map(({ book }) => ({ book, selected: !allSelected })));
  };

  useEffect(() => {
    setValidationDisabled(!books.find(({ selected }) => selected));
    setAllSelected(!books.find(({ selected }) => !selected));
  }, [books]);

  return (
    <Modal
      title="books filter"
      onCloseModal={onCloseModal}
      onValidate={() => onBooksFilterValidated(cdr, books)}
      validationDisabled={validationDisabled}
    >
      <div className={CibClass.cibPy2}>
        <SelectInput
          options={availableCdrs}
          selectedValue={cdr}
          onChange={(value) => onCdrChanged(value as Cdr)}
          searchBarPlaceholder="CDR name"
          className="cdr-picker"
        />
      </div>

      <div className={`${CibClass.cibFlex} ${CibClass.cibFlexRow}`}>
        <div className={`${CibClass.cibFlex} ${CibClass.cibFlexCol} ${CibClass.cibPy2}`}>
          <ComponentWrapper
            onClick={(e) => {
              e.stopPropagation();
              onClickOnALL();
            }}
            className={CibClass.cibFlex}
          >
            <cib-checkbox label="All" name="myCheckbox" checked={allSelected} />
          </ComponentWrapper>
          <div className={CibClass.cibPl4}>
            {books.map(({ book, selected }) => (
              <ComponentWrapper
                key={book}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickOnBook(book);
                }}
                className={`${CibClass.cibFlex}`}
              >
                <cib-checkbox label={book} name="myCheckbox" checked={selected} />
              </ComponentWrapper>
            ))}
          </div>
        </div>

        {!allSelected && books.find(({ selected }) => selected) ? (
          <div
            className={`${CibClass.cibFlex} ${CibClass.cibFlexWrap} ${CibClass.cibHFitContent} ${CibClass.cibMl_1} ${CibClass.cibPx2} ${CibClass.cibPy1} rps-books-chips-container`}
          >
            {books.map(({ book, selected }) =>
              selected ? (
                <div key={book} className={`${CibClass.cibPx1} ${CibClass.cibPy1}`}>
                  <Chips label={book} onClosed={() => onClickUnselectBook(book)}></Chips>
                </div>
              ) : null,
            )}
          </div>
        ) : null}
      </div>
    </Modal>
  );
};
