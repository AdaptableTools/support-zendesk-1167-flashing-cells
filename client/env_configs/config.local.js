const config = {
  serverUrl: 'http://localhost:8081/',
  wsServerUrl: 'http://localhost:8082/',
  enableReduxDevtools: true,
  checkGridSynchronizedMilliseconds: 10_000,
  signalR: {
    fastRetrials: { times: 10, durationMs: 60_000 },
    longRetrials: { times: 10, durationMs: 1_800_000 },
  },
};

window.configuration = config;
