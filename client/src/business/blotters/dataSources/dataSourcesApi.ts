import { fetchApi } from '#/fetchApi';
import { Cdr, PositionsSnapshot, TradesSnapshot } from './dataSourcesModel';

export const dataSourcesApi = {
  loadTradesSnapshot: async (_cdr: Cdr): Promise<TradesSnapshot> => {
    const response = await fetchApi.get('api/trades');
    return await response.json();
  },
  loadPositionsSnapshot: async (_cdr: Cdr): Promise<PositionsSnapshot> => {
    const response = await fetchApi.get('api/positions');
    return await response.json();
  },
};
