import React from 'react';
import { thunks } from '#/business/rpsThunks';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '#/business/configureStore';
import { selectors } from '#/business/rpsSelectors';
import { DispatchProps, BooksFilterModalComponent, ModelProps, OwnProps } from './BooksFilterModal.presentational';
import { createSelector } from '@reduxjs/toolkit';
import { Cdr, booksMap, cdrs } from '#/business/rpsModel';

const availableCdrs: ModelProps['availableCdrs'] = cdrs.map((cdr) => ({ value: cdr, label: cdr }));
const availableCdrWithBooks: ModelProps['availableCdrWithBooks'] = (Object.keys(booksMap) as Cdr[]).reduce(
  (previous, currentCdr): ModelProps['availableCdrWithBooks'] => ({
    ...previous,
    [currentCdr]: booksMap[currentCdr].map((book) => ({ book, selected: true })),
  }),
  { 99999: [], 70805: [] } as ModelProps['availableCdrWithBooks'],
);
const selectStateProps = createSelector(
  [selectors.selectCdr, selectors.selectBooks],
  (cdr, selectedBooks): ModelProps => ({
    selectedCdr: cdr,
    currentBooks: selectedBooks.length
      ? booksMap[cdr].map((book) => ({ book, selected: selectedBooks.includes(book) }))
      : availableCdrWithBooks[cdr],
    availableCdrs,
    availableCdrWithBooks,
  }),
);
export const BooksFilterModal: React.FC<OwnProps> = (ownProps) => {
  const modelProps = useSelector<RootState, ModelProps>(selectStateProps);
  const dispatch = useDispatch<Dispatch>();
  const dispatchProps: DispatchProps = {
    onBooksFilterValidated: (cdr, books) => {
      dispatch(thunks.booksFilterUpdatedThunk(cdr, books));
    },
  };

  return <BooksFilterModalComponent {...ownProps} {...dispatchProps} {...modelProps} />;
};
