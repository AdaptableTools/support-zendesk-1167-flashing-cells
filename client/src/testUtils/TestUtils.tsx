import React from 'react';
import { fireEvent, render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { rpsReducers } from '#/business/rpsReducers';
import { RootState } from '#/business/configureStore';
import fetchMock from 'jest-fetch-mock';
import { extraArgument } from '#/business/rpsThunks';
import { act } from 'react';

jest.mock('#/connectionManager');
jest.mock('react-fetch-hook');

fetchMock.enableMocks();

// re-export everything
export * from '@testing-library/react';

export function render(
  ui: Parameters<typeof rtlRender>[0],
  options: Parameters<typeof rtlRender>[1] & {
    preloadedState?: RootState;
  } = {},
): ReturnType<typeof rtlRender> {
  const { preloadedState, ...renderOptions } = options;

  const store = configureStore({
    preloadedState,
    reducer: rpsReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument,
        },
      }),
  });

  const wrapper: (typeof options)['wrapper'] = ({ children }) => <Provider store={store}>{children}</Provider>;
  return rtlRender(ui, { wrapper, ...renderOptions });
}

export async function showAllColums(container: HTMLElement) {
  const showAllCheckBox = await container.querySelector('[aria-label="Toggle Select All Columns"]');
  if (showAllCheckBox !== null) {
    await act(() => fireEvent.click(showAllCheckBox));
  }
}

export async function getColunm(container: HTMLElement, colunmId: string) {
  return await container
    .getElementsByClassName('ag-center-cols-container')
    .item(0)
    ?.querySelector('[col-id="' + colunmId + '"]');
}
