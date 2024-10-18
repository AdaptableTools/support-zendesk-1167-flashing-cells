const config = {
  serverUrl: 'https://fn7qhj-8081.csb.app/',
  wsServerUrl: 'wss://fn7qhj-8082.csb.app/',
  enableReduxDevtools: true,
  checkGridSynchronizedMilliseconds: 10_000,
  signalR: {
    fastRetrials: { times: 10, durationMs: 60_000 },
    longRetrials: { times: 10, durationMs: 1_800_000 },
  },
};

window.configuration = config;
