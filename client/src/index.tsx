import './index.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './business/configureStore';
import { App } from './components/App';
import { Provider } from 'react-redux';

const container: HTMLElement = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
);
