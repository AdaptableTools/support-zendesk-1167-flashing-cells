import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '#/business/configureStore';
import { selectors } from '#/business/rpsSelectors';
import { BooksFilterComponent, ModelProps } from './BooksFilter.presentational';
import { createSelector } from '@reduxjs/toolkit';

const selectStateProps = createSelector(
  [selectors.selectCdr, selectors.selectCdrIsLoading, selectors.selectBooks],
  (selectedCdr, disabled, books): ModelProps => ({
    selectedCdr,
    disabled,
    selectedBooks: `${books.length || 'All'}`,
  }),
);
export const BooksFilter: React.FC = () => {
  const modelProps = useSelector<RootState, ModelProps>(selectStateProps);

  return <BooksFilterComponent {...modelProps} />;
};
