export {};

declare global {
  interface ConnectionRetrials {
    times: number;
    durationMs: number;
  }
  interface Configuration {
    serverUrl: string;
    wsServerUrl: string;
    enableReduxDevtools: boolean;
    checkGridSynchronizedMilliseconds: number;
    signalR?: {
      fastRetrials: ConnectionRetrials;
      longRetrials: ConnectionRetrials;
    };
  }
  interface Window {
    configuration: Configuration;
  }
  const configuration: Configuration;
}
