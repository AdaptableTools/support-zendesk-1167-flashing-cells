import { AdaptableApi } from '@adaptabletools/adaptable-react-aggrid';
import { GridApi } from '@ag-grid-community/core';

class GridApiManager {
  #adaptableApi: AdaptableApi | undefined;
  #agGridApi: GridApi | undefined;

  constructor() {
    this.#adaptableApi = undefined;
    this.#agGridApi = undefined;
  }

  public setAdaptableApi(adaptableApi: AdaptableApi | undefined) {
    this.#adaptableApi = adaptableApi;
  }

  public getAdaptableApi(): AdaptableApi | undefined {
    return this.#adaptableApi;
  }

  public setAgGridApi(agGridApi: GridApi | undefined) {
    this.#agGridApi = agGridApi;
  }

  public getAgGridApi(): GridApi | undefined {
    return this.#agGridApi;
  }
}

export const gridApiManager = new GridApiManager();
