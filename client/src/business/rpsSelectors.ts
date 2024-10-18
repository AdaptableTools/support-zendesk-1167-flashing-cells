import { blottersSelectors } from './blotters/blottersSelectors';

export const selectors = {
  ...blottersSelectors,
};

export type Selectors = typeof selectors;
