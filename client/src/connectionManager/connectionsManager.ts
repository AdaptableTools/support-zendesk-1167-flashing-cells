import { PendingEvent, TradeEvent, PositionEvent, Cdr, GridKind } from '#/business/rpsModel';
import { capitalize } from 'lodash';
import { HubConnectionManager } from './hubConnectionManager';

class ConnectionsManager {
  #rpsBondHub: HubConnectionManager;

  constructor() {
    this.#rpsBondHub = new HubConnectionManager('RpsBondHub');
  }

  public subscribeToTrades(callBack: (data: TradeEvent | null) => void) {
    this.#rpsBondHub.subscribe('RpsTradeIncrement', (data: TradeEvent | null) => callBack(data));
  }

  public unsubscribeFromTrades() {
    this.#rpsBondHub.unsubscribe('RpsTradeIncrement');
  }

  public subscribeToPositions(callBack: (data: PositionEvent | null) => void) {
    this.#rpsBondHub.subscribe('RpsPositionIncrement', (data: PositionEvent | null) => callBack(data));
  }

  public unsubscribeFromPositions() {
    this.#rpsBondHub.unsubscribe('RpsPositionIncrement');
  }

  public subscribeToClear(callBack: (data: PendingEvent | null) => void) {
    this.#rpsBondHub.subscribe('Clear', (data: PendingEvent | null) => callBack(data));
  }

  public subscribeToGroup(kind: GridKind, cdr: Cdr) {
    this.#rpsBondHub.subscribeToGroup(`Rps${capitalize(kind)}Increment_${cdr}`);
  }

  public unsubscribeFromGroup(kind: GridKind, cdr: Cdr) {
    this.#rpsBondHub.unsubscribeFromGroup(`Rps${capitalize(kind)}Increment_${cdr}`);
  }

  public startRpsBondHubConnection(): void {
    this.#rpsBondHub.start();
  }

  public stopTradeHubConnection(): void {
    this.#rpsBondHub.stop();
  }
}

export const connectionsManager = new ConnectionsManager();
